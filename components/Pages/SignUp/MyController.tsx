import { Pressable, Text, TextInput, View } from 'react-native';
import { Controller } from 'react-hook-form';
import { Eye, Lock } from 'lucide-react-native';

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
            <TextInput
              onChange={onChange}
              secureTextEntry={secure}
              onBlur={onBlur}
              placeholder={placeholder}
              value={value}
              className={`size-fit w-full rounded-md border-[1px] border-gray-500 bg-slate-100 p-2  outline-none placeholder:text-right placeholder:text-gray-500 ${error && 'border-red-500'} ${className} `}></TextInput>
            {error && <Text className="font-Kufi text-xs text-red-600">{error.message}</Text>}
          </View>
        )}></Controller>
    </>
  );
};

export default MyController;
