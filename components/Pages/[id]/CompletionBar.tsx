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
        className={`mx-6 h-4 w-full flex-row-reverse self-center overflow-hidden rounded-md border-[1px] ${percentCompleted <= 30 && ' border-red-900'} ${percentCompleted > 30 && percentCompleted < 60 && ' border-yellow-900'} ${percentCompleted >= 60 && ' border-green-900'} ${className}`}>
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
            className={` flex-1 items-center justify-center rounded-2xl rounded-l-md ${percentCompleted <= 30 && ' bg-red-300'} ${percentCompleted > 30 && percentCompleted < 60 && ' bg-yellow-400'} ${percentCompleted >= 60 && ' bg-green-500'}`}>
            {/** Progress Percent */}
            <Text
              className={`font-bold  ${percentCompleted > 0 && percentCompleted <= 30 && ' text-red-900'} ${percentCompleted > 30 && percentCompleted < 60 && ' text-yellow-900'} ${percentCompleted >= 60 && ' text-green-900'}`}>
              {percentCompleted > 0 && percentCompleted + '%'}
            </Text>
          </View>
        </MotiView>
      </View>
    </>
  );
};

export default CompletionBar;
