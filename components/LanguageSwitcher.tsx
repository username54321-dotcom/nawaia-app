import { Globe } from 'lucide-react-native';
import { Text, Pressable } from 'react-native';
import i18n from '~/lib/i18n';
import tw from 'twrnc';
import { useState } from 'react';

export const LanguageSwitcher = () => {
  const [langText, setLangText] = useState<string>('العربية');

  const toggleLanguage = async () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
    const currentLang = i18n.language === 'ar' ? 'English' : 'العربية';
    setLangText(currentLang);
    console.log(currentLang);
  };

  return (
    <>
      <Pressable
        onPress={toggleLanguage}
        className="defaultBorder  min-h-12 flex-row items-center justify-center rounded-full  ">
        <Text selectable={false} className="defaultText px-2">
          {langText}
        </Text>
        <Globe className="mr-2" color={tw.color('neutral-800')} size={18} />
      </Pressable>
    </>
  );
};
