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
  placeholder: string;
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
          <>
            <Text className="font-Kufi font-bold">{title}</Text>
            <TextInput
              onChange={onChange}
              secureTextEntry={secure}
              onBlur={onBlur}
              placeholder={placeholder}
              value={value}
              className=" rounded-md  bg-slate-100 p-2 outline-none placeholder:text-right  placeholder:text-gray-500  "></TextInput>
          </>
        )}></Controller>
      {error && <Text className="font-Kufi text-red-600">{error.message}</Text>}
    </>
  );
};

export default MyController;
