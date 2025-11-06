import { View, Text } from 'react-native';
import React from 'react';
import Background from '~/components/Background';
import CourseList from '~/components/Courses/CourseList';

const Courses = () => {
  return (
    <Background>
      <CourseList></CourseList>
    </Background>
  );
};

export default Courses;
