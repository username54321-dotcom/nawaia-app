import { useIsAuth } from '~/store/store';
import SignedOutPage from '~/components/Pages/Account/SignedOut/SignedOutPage';
import SignedInPage from './../../../components/Pages/Account/SignedIn/SignedInPage';

const Account = () => {
  const { isAuth } = useIsAuth();
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
