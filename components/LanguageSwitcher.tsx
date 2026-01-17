import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useLanguageStore } from '~/store/store';

export const LanguageSwitcher = () => {
  const { t, i18n } = useTranslation();
  const setLanguage = useLanguageStore(
    (state: { setLanguage: (lang: string) => void }) => state.setLanguage
  );

  const toggleLanguage = async () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    setLanguage(newLang);

    // Optional: Handle RTL layout changes if necessary
    // const isRTL = newLang === 'ar';
    // if (isRTL !== I18nManager.isRTL) {
    //   I18nManager.allowRTL(isRTL);
    //   I18nManager.forceRTL(isRTL);
    //   await Updates.reloadAsync();
    // }
  };

  return (
    <TouchableOpacity
      onPress={toggleLanguage}
      className="items-center justify-center rounded-lg bg-primary/20 p-2">
      <Text className="font-bold text-primary">{t('change_language')}</Text>
    </TouchableOpacity>
  );
};
