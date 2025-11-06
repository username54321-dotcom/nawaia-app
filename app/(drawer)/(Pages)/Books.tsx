import Background from '~/components/Background';
import Lexical from './../../../components/Reusebales/Lexical';
import { memo } from 'react';
import { useNavigation } from 'expo-router';
import { UAParser } from 'ua-parser-js';

const Books = () => {
  const test = new UAParser(navigator.userAgent).getOS().withFeatureCheck();
  return <Background></Background>;
};

export default memo(Books);
