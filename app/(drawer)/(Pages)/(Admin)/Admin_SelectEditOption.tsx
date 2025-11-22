import { View, Text, Pressable } from 'react-native';
import { memo, useCallback, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabaseClient } from '~/utils/supabase';
import Background from '~/components/Background';
import FadeIn from '~/components/Animations/FadeIn';
import AdminPublishButton from '../../../../components/Pages/AdminPage/AdminPublishButton';
import { Plus, Trash2 } from 'lucide-react-native';
import { addDummyCourse } from '~/HelperFunctions/Add_Dummy_Course';
import { useFocusEffect, useRouter } from 'expo-router';
import MyImage1 from '~/components/Reusebales/MyImage';
import useAdminOnly from '~/HelperFunctions/Hooks/AdminOnly';
import Admin_EditAssestsComponent from '../../../../components/Pages/AdminPage/Admin_EditAssestsComponent';

const Admin_SelectEditOption = () => {
  const router = useRouter();

  useAdminOnly();

  //Main Query
  const { data: courseList, refetch } = useQuery({
    queryKey: ['Admin Get Courses'],
    queryFn: async () => {
      const { data } = await supabaseClient.from('courses').select('*');
      return data;
    },
    staleTime: Infinity,
  });

  //Delete a Course
  const handleDelete = useCallback(async (id: number) => {
    await supabaseClient.from('courses').delete().eq('id', id);
  }, []);

  //Prevent Double Adding Courses
  const [cantAdd, setCantAdd] = useState(false);

  // Add a Dummy Course
  const handleAddDummyCourse = useCallback(async () => {
    setCantAdd(true);
    await addDummyCourse();
    refetch();
    setCantAdd(false);
  }, [refetch]);

  //Navigate to edit page
  const handleEditCourse = useCallback(
    (id: number) => {
      router.navigate({ pathname: '/Admin_EditCourse', params: { id: id } });
    },
    [router]
  );

  // RealTime
  useFocusEffect(() => {
    const channel = supabaseClient.channel('realtime select course');
    channel
      .on('postgres_changes', { event: '*', table: 'courses', schema: 'public' }, () => refetch())
      .subscribe();

    return () => {
      supabaseClient.removeChannel(channel);
    };
  });

  return (
    <Background>
      <Admin_EditAssestsComponent></Admin_EditAssestsComponent>
    </Background>
  );
};

export default memo(Admin_SelectEditOption);
