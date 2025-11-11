import { MotiView } from 'moti';
import { View, Text } from 'react-native';
import { style } from 'twrnc';

interface propTypes {
  percentCompleted: number;
  className?: string;
}

const CompletionBar = ({ percentCompleted, className }: propTypes) => {
  return (
    <>
      {/** Main Container */}
      <View
        className={`h-4 w-full flex-row-reverse overflow-hidden rounded-2xl border-[1px] ${percentCompleted <= 30 && ' border-red-700'} ${percentCompleted > 30 && percentCompleted < 60 && ' border-yellow-700'} ${percentCompleted >= 60 && ' border-green-700'} ${className}`}>
        {/** Conditional Centered Percentage Progress == 0 ?   */}
        {percentCompleted == 0 && (
          <>
            <Text className="mx-auto self-center">0%</Text>
          </>
        )}
        {/** Animation Container */}
        <MotiView
          transition={{ type: 'spring', damping: 75 }}
          style={style(' h-full')}
          from={{ width: `0%` }}
          animate={{ width: `${percentCompleted}%` }}>
          {/**Progress Bar */}
          <View
            className={` flex-1 items-center justify-center rounded-2xl ${percentCompleted <= 30 && ' bg-red-300'} ${percentCompleted > 30 && percentCompleted < 60 && ' bg-yellow-400'} ${percentCompleted >= 60 && ' bg-green-500'}`}>
            {/** Progress Percent */}
            <Text
              className={`font-bold  ${percentCompleted > 0 && percentCompleted <= 30 && ' text-red-700'} ${percentCompleted > 30 && percentCompleted < 60 && ' text-yellow-700'} ${percentCompleted >= 60 && ' text-green-700'}`}>
              {percentCompleted > 0 && percentCompleted + '%'}
            </Text>
          </View>
        </MotiView>
      </View>
    </>
  );
};

export default CompletionBar;
