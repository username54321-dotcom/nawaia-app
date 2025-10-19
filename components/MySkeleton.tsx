import { View } from 'react-native';
import React, { ComponentProps } from 'react';
import { Skeleton } from 'moti/skeleton';
import { MotiView } from 'moti';

type MySkeletonProps = {
  className?: string;
} & ComponentProps<typeof Skeleton>;

const LColor = '#d4d4d8';
const DColor = '#a1a1aa';

const MySkeleton = ({ className, radius, children, ...skeletonProps }: MySkeletonProps) => {
  const isRounded = radius ? radius : null;
  return (
    <MotiView
      from={{ opacity: 1, scaleX: 0.98, scaleY: 0.99 }}
      animate={{ opacity: 1, scaleX: 1, scaleY: 1 }}
      transition={{ type: 'timing', loop: true, duration: 1000 }}
      exit={{ opacity: 0.1 }}
      exitTransition={{ type: 'timing', duration: 1000 }}
      className={className + (isRounded ? ' rounded-full' : '')}>
      <Skeleton show={true} colors={[LColor, DColor, LColor, DColor]} {...skeletonProps}>
        {children}
      </Skeleton>
    </MotiView>
  );
};

export default MySkeleton;
