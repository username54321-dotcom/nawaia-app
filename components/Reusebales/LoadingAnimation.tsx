import { View, ActivityIndicator } from 'react-native';
import { memo, useEffect, useState } from 'react';
import FadeIn from '~/components/Animations/FadeIn';

interface propTypes {
  show: boolean;
}

const LoadingAnimation = ({ show }: propTypes) => {
  const [showLoading, setShowLoading] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (show) {
        setShowLoading(true);
      }
    }, 200);
    if (!show) {
      setShowLoading(false);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [show]);
  return (
    <>
      {showLoading && (
        <View className="min-h-[90vh] min-w-[100vw] items-center justify-center">
          <ActivityIndicator size={36} color={'#be1e2d'}></ActivityIndicator>
        </View>
      )}
    </>
  );
};

export default memo(LoadingAnimation);
