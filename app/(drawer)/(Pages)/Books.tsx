import Background from '~/components/Background';
import Lexical from './../../../components/Reusebales/Lexical';
import { memo } from 'react';
import { useNavigation } from 'expo-router';
import { UAParser } from 'ua-parser-js';

const Books = () => {
  console.log(navigator.userAgent);
  const test = new UAParser(navigator.userAgent).getOS().withFeatureCheck();
  console.log(test);
  return <Background></Background>;
};

export default memo(Books);
