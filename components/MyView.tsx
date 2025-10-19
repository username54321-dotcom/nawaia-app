import { View, Text } from 'react-native';
import React from 'react';
import { MotiView } from 'moti';

const MyView = ({ children, className, ...props }: { children: any; className: any }) => {
  return <MotiView {...props}>{children}</MotiView>;
};

export default MyView;
