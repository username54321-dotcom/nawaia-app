import { MotiView } from 'moti';
import { View, Text } from 'react-native';
import { style } from 'twrnc';

interface propTypes {
  percentCompleted: number;
  allLessonNumber: number;
  completedLessonNumber: number;
}

const CompletionBar = ({ percentCompleted, completedLessonNumber, allLessonNumber }: propTypes) => {
  return (
    <>
      <View className="h-6 w-full flex-row-reverse overflow-hidden rounded-2xl border-2 border-neutral-300">
        <MotiView
          transition={{ delay: 500, type: 'spring', damping: 75 }}
          style={style(' h-full')}
          from={{ width: `0%` }}
          animate={{ width: `${percentCompleted}%` }}>
          <View
            className={` flex-1 items-center justify-center rounded-2xl ${percentCompleted <= 30 && ' bg-red-300'} ${percentCompleted > 30 && percentCompleted < 60 && ' bg-yellow-400'} ${percentCompleted >= 60 && ' bg-green-500'}`}>
            <Text className="font-bold text-green-800">{`${percentCompleted}%`}</Text>
          </View>
        </MotiView>
      </View>
    </>
  );
};

export default CompletionBar;
