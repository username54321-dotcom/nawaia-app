import Background from '~/components/Background';
import { memo } from 'react';
import { supabaseClient } from '~/utils/supabase';

const About = () => {
  const {
    data,
  } = async () => {
    await supabaseClient.from('courses').select('t');
  };
  return <Background></Background>;
};

export default memo(About);
