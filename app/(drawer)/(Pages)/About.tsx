import Background from '~/components/Background';
import { memo } from 'react';
import { supabaseClient } from '~/utils/supabase';

const About = () => {
  const {
    data,
  } = async () => {
    await supabaseClient.from('courses').select('title');
  };
  return <Background></Background>;
};

export default memo(About);
