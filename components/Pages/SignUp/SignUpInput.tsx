import { Text, TextInput } from 'react-native';
import { Controller } from 'react-hook-form';

const MyController = ({
  control,
  name,
  placeholder,
  className,
  error,
}: {
  control: any;
  name: string;
  placeholder: string;
  className: string;
  error: any;
}) => {
  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange, onBlur } }) => (
          <>
            <TextInput
              onChange={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              value={value}
              className={'' + className}></TextInput>
          </>
        )}></Controller>
      {error && <Text className="font-Kufi text-red-600">{error.message}</Text>}
    </>
  );
};

export default MyController;
