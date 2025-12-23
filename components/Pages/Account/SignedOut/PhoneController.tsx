import { Pressable, Text, TextInput, View } from 'react-native';
import { Controller } from 'react-hook-form';
import { Eye } from 'lucide-react-native';
import { memo, useCallback, useState } from 'react';
import PhoneInput from 'react-native-phone-number-input';

const MyController = ({
  control,
  name,
  placeholder = '',
  className = '',
  error,
  secure = false,
  icon,
  title,
}: {
  control: any;
  name: string;
  placeholder?: string;
  className?: string;
  error: any;
  secure?: boolean;
  icon?: any;
  title: string;
}) => {
  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange, onBlur } }) => (
          <View className="mt-2 flex-1 flex-col items-center justify-center ">
            <Text className="mb-2 mt-2 self-end  font-Kufi text-xs font-bold text-gray-900">
              {title}
            </Text>
            {/** Text Input View */}
            <View className="w-full">
              <PhoneInput></PhoneInput>
            </View>
            {error && (
              <Text className="w-full text-right font-Kufi text-xs text-red-600">
                {error.message}
              </Text>
            )}
          </View>
        )}></Controller>
    </>
  );
};

export default memo(MyController);
