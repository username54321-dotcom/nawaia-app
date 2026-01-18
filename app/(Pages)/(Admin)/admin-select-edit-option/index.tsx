import { memo } from 'react';
import Background from '~/components/Background';
import FadeIn from '~/components/Animations/FadeIn';

import useAdminOnly from '~/HelperFunctions/Hooks/AdminOnly';
import Admin_EditAssestsComponent from './_components/Admin_EditAssestsComponent';

const Admin_SelectEditOption = () => {
  useAdminOnly();

  return (
    <Background>
      <FadeIn>
        <Admin_EditAssestsComponent></Admin_EditAssestsComponent>
      </FadeIn>
    </Background>
  );
};

export default memo(Admin_SelectEditOption);
