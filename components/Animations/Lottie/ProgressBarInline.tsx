import { MotiView } from 'moti';
import { View, Text } from 'react-native';
import { style } from 'twrnc';

interface propTypes {
  percentCompleted: number;
  className?: string;
}

const ProgressBarInline = ({ percentCompleted, className }: propTypes) => {
  return (
    <>
      {/** Main Container */}
      <View className={`mx-6 h-2 w-full flex-row self-center bg-gray-400/75  `}>
        {/** Conditional Centered Percentage Progress == 0 ?   */}

        {/** Animation Container */}
        <MotiView
          transition={{ type: 'spring', damping: 75 }}
          style={style(' h-full')}
          from={{ width: `0%` }}
          animate={{ width: `${percentCompleted}%` }}>
          {/**Progress Bar */}
          <View className={` flex-1 items-center justify-center  bg-red-500/90 `}></View>
        </MotiView>
      </View>
    </>
  );
};

export default ProgressBarInline;
