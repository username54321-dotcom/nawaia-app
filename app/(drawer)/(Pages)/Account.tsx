import { useIsAuth, useIsAuthType } from '~/store/store';
import SignedOutPage from '~/components/Pages/Account/SignedOut/SignedOutPage';
import SignedInPage from './../../../components/Pages/Account/SignedIn/SignedInPage';
import { useRoute } from '@react-navigation/native';

const Account = () => {
  console.log(useRoute().path);

  const isAuth = useIsAuth((state: useIsAuthType) => state.isAuth);

  return isAuth ? (
    <>
      <SignedInPage></SignedInPage>
    </>
  ) : (
    <>
      <SignedOutPage></SignedOutPage>
    </>
  );
};

export default Account;
