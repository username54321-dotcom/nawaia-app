import { memo } from 'react';
import { supabaseClient } from '~/utils/supabase';
import Background from '~/components/Background';
import FadeIn from '~/components/Animations/FadeIn';

import { useFocusEffect } from 'expo-router';

import useAdminOnly from '~/HelperFunctions/Hooks/AdminOnly';
import Admin_EditAssestsComponent from '../../../../components/Pages/AdminPage/Admin_EditAssestsComponent';

const Admin_SelectEditOption = () => {
  useAdminOnly();

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
      <FadeIn>
        <Admin_EditAssestsComponent></Admin_EditAssestsComponent>
      </FadeIn>
    </Background>
  );
};

export default memo(Admin_SelectEditOption);
