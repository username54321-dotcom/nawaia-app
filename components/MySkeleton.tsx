import { View } from 'react-native';
import React, { ComponentProps } from 'react';
import { Skeleton } from 'moti/skeleton';
import { MotiView } from 'moti';

type MySkeletonProps = {
  className?: string;
} & ComponentProps<typeof Skeleton>;
const LColor = '#d4d4d4';
const DColor = '#a3a3a3';

const MySkeleton = ({ className, ...skeletonProps }: MySkeletonProps) => {
  return (
    <>
      <MotiView
        from={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ type: 'timing', loop: true, duration: 1000 }}
        className={className}>
        <Skeleton show={true} colors={[LColor, DColor, LColor, DColor, LColor]} {...skeletonProps}>
          <View className={className}></View>
        </Skeleton>
      </MotiView>
    </>
  );
};

export default MySkeleton;
