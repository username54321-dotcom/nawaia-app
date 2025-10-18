import { View } from 'react-native';
import React, { ComponentProps } from 'react';
import { Skeleton } from 'moti/skeleton';
import { AnimatePresence, MotiView } from 'moti';

type MySkeletonProps = {
  className?: string;
} & ComponentProps<typeof Skeleton>;
const LColor = '#d4d4d4';
const DColor = '#fee2e2';

const MySkeleton = ({ className, radius, children, ...skeletonProps }: MySkeletonProps) => {
  const isRounded = radius ? radius : null;
  return (
    <MotiView
      from={{ scaleX: 0.95, scaleY: 0.99 }}
      animate={{ scaleX: 1, scaleY: 1 }}
      transition={{ type: 'timing', loop: true, duration: 1000 }}
      className={className + isRounded && ' rounded-full'}>
      <Skeleton show={true} colors={[LColor, DColor, LColor, DColor]} {...skeletonProps}>
        <View className={className + isRounded && ' rounded-full'}>{children}</View>
      </Skeleton>
    </MotiView>
  );
};

export default MySkeleton;
