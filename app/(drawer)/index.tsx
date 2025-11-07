import Background from './../../components/Background';
import { Text } from 'react-native';

import FadeIn from './../../components/Animations/FadeIn';
import { memo } from 'react';

const Home = () => {
  return (
    <>
      <Background>
        <FadeIn>
          <Text className="m-2 mb-0 font-Playwrite text-2xl">Example Title</Text>
          <Text className="m-4 font-Playwrite">
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque animi quis, ut at
            quaerat itaque explicabo libero? Vitae sunt sit odio atque dolore dicta fugit! Quos sed
            minus delectus maxime!'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque
            animi quis, ut at quaerat itaque explicabo libero? Vitae sunt sit odio atque dolore
            dicta fugit! Quos sed minus delectus maxime!'Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Cumque animi quis, ut at quaerat itaque explicabo libero? Vitae sunt
            sit odio atque dolore dicta fugit! Quos sed minus delectus maxime!
          </Text>
        </FadeIn>
      </Background>
    </>
  );
};
export default memo(Home);
