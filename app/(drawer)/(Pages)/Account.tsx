import { useIsAuth, useIsAuthType } from '~/store/store';
import SignedOutPage from '~/components/Pages/Account/SignedOut/SignedOutPage';
import SignedInPage from './../../../components/Pages/Account/SignedIn/SignedInPage';
import Head from 'expo-router/head';

const Account = () => {
  const isAuth = useIsAuth((state: useIsAuthType) => state.isAuth);

  return isAuth ? (
    <>
      <Head>
        <title>Account | Nawaia</title>
        <meta name="robots" content="noindex" />
      </Head>
      <SignedInPage></SignedInPage>
    </>
  ) : (
    <>
      <Head>
        <title>Sign In | Nawaia</title>
        <meta name="description" content="Sign in to your Nawaia account." />
      </Head>
      <SignedOutPage></SignedOutPage>
    </>
  );
};

export default Account;
