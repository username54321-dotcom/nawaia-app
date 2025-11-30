import Background from '~/components/Background';
import { TextInput, Pressable, Text } from 'react-native';
import { useCallback, useRef, useState } from 'react';
import { supabaseClient } from '~/utils/supabase';

const SendResetPassword = () => {
  const emailInput = useRef<string>('');
  const [invalidEmail, setinvalidEmail] = useState<null | boolean>(null);
  const [emailSent, setEmailSent] = useState(false);

  // Set User Inputted Email
  const setInputEmail = useCallback((value: string) => {
    emailInput.current = value;
  }, []);

  //Check if Email is Valid
  const verifyEmail = useCallback(async () => {
    if (emailInput.current?.length > 0) {
      const { data: emailValid } = await supabaseClient.rpc('email_exists', {
        email_check: emailInput.current,
      });
      console.log(emailValid);
      setinvalidEmail(emailValid);
      if (emailValid) {
        const { data: emailSent } = await supabaseClient.auth.resetPasswordForEmail(
          emailInput.current,
          { redirectTo: 'http://localhost:8081/reset_password' }
        );
        emailSent && setEmailSent(true);
      }
    }
  }, []);

  return (
    <Background>
      {!emailSent && (
        <>
          <TextInput
            onChangeText={(v) => setInputEmail(v)}
            className=" w-30 h-12 border-2"></TextInput>
          <Pressable onPress={verifyEmail} className="size-12 bg-red-500"></Pressable>
          {invalidEmail === false && (
            <>
              <Text>wrong email</Text>
            </>
          )}
        </>
      )}

      {emailSent && (
        <>
          <Text>EmailSent , Check your email</Text>
        </>
      )}
    </Background>
  );
};

export default SendResetPassword;
