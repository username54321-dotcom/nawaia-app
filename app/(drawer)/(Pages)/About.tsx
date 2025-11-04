import Background from '~/components/Background';
import { memo, useEffect, useState } from 'react';
import { supabaseClient } from '~/utils/supabase';

const About = () => {
  const [courses, setCourses] = useState<any[]>([]); // Replace 'any' with proper type later

  useEffect(() => {
    const fetchData = async () => {
      // ✅ VALID USAGE: Autocomplete works here
      const { data, error } = await supabaseClient
        .from('courses') // ✅ Autocomplete works
        .select('id'); // ✅ ALL TABLE COLUMNS WILL AUTO COMPLETE

      if (error) console.error('Fetch error:', error);
      else setCourses(data || []);
    };

    fetchData();
  }, []);

  return (
    <Background>
      {courses.map((course) => (
        <div key={course.id}>{course.title}</div>
      ))}
    </Background>
  );
};

export default memo(About);
