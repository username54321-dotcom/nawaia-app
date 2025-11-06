import { useIsAuth } from '~/store/store';
import SignedOutPage from '~/components/Pages/Account/SignedOut/SignedOutPage';

const Account = () => {
  const { isAuth } = useIsAuth();
  return (
    isAuth && (
      <>
        <SignedOutPage></SignedOutPage>
      </>
    )
  );
};

export default Account;
