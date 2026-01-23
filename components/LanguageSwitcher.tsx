import { Globe } from 'lucide-react-native';
import { Text, Pressable } from 'react-native';
import i18n from '~/lib/i18n';
import tw from 'twrnc';

export const LanguageSwitcher = () => {
  const currentLang = i18n.language === 'ar' ? 'English' : 'العربية';

  const toggleLanguage = async () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);

    // Optional: Handle RTL layout changes if necessary
    // const isRTL = newLang === 'ar';
    // if (isRTL !== I18nManager.isRTL) {
    //   I18nManager.allowRTL(isRTL);
    //   I18nManager.forceRTL(isRTL);
    //   await Updates.reloadAsync();
    // }
  };

  return (
    <>
      <Pressable
        onPress={toggleLanguage}
        className="defaultBorder  min-h-12 flex-row items-center justify-center rounded-full  ">
        <Text className="defaultText px-2">{currentLang}</Text>
        <Globe className="mr-2" color={tw.color('neutral-800')} size={18} />
      </Pressable>
    </>
  );
};
