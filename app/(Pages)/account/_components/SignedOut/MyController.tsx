import { Pressable, Text, TextInput, View } from 'react-native';
import { Controller } from 'react-hook-form';
import { Eye } from 'lucide-react-native';
import { memo, useCallback, useState } from 'react';

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
  const [showPasswordIcon, setShowPasswordIcon] = useState(false);
  const [showPassword, setShowPassword] = useState(secure);
  const handleShowPassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, [setShowPassword]);
  const handleShowPasswordIcon = useCallback((textValue: string) => {
    if (textValue.length > 0) {
      setShowPasswordIcon(true);
    } else {
      setShowPasswordIcon(false);
    }
  }, []);
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
              <TextInput
                onChange={onChange}
                secureTextEntry={showPassword}
                onBlur={onBlur}
                onChangeText={(text) => handleShowPasswordIcon(text)}
                placeholder={placeholder}
                value={value}
                className={`size-fit w-full rounded-md border-[1px] border-gray-500 bg-slate-100 p-2  outline-none placeholder:text-right placeholder:text-gray-500 ${error && 'border-red-500'} ${className} `}></TextInput>
              {secure && showPasswordIcon && (
                <View className="absolute h-full flex-row  items-center self-end ">
                  <Pressable onPress={handleShowPassword} className="ml-auto mr-2">
                    <Eye size={22} color={'#475569'}></Eye>
                  </Pressable>
                </View>
              )}
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
