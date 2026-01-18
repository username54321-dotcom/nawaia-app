import { useIsAuth, useIsAuthType } from '~/store/store';
import SignedOutPage from './_components/SignedOut/SignedOutPage';
import SignedInPage from './_components/SignedInPage';
import Head from 'expo-router/head';

import { useTranslation } from 'react-i18next';

const Account = () => {
  const { t } = useTranslation();
  const isAuth = useIsAuth((state: useIsAuthType) => state.isAuth);

  return isAuth ? (
    <>
      <Head>
        <title>{t('account_title')}</title>
        <meta name="robots" content="noindex" />
      </Head>
      <SignedInPage></SignedInPage>
    </>
  ) : (
    <>
      <Head>
        <title>{t('sign_in_title')}</title>
        <meta name="description" content={t('sign_in_desc')} />
      </Head>
      <SignedOutPage></SignedOutPage>
    </>
  );
};

export default Account;
