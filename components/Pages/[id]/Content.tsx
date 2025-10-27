import { useNavigation, useRouter } from 'expo-router';
import { LinkIcon } from 'lucide-react-native';
import { View, Text, Pressable } from 'react-native';
import * as Linking from 'expo-linking';
import { useIsAuth, useModalVisible } from '~/store/store';

const IdContent = ({ data }: { data: any }) => {
  const content = data.content;
  const { isAuth } = useIsAuth();
  const { setModalVisible } = useModalVisible();

  return (
    <>
      {content.map((item, index) => {
        return (
          <View key={index}>
            <View
              aria-label="ChapterName Container"
              className="m-2  h-12 w-full items-center self-center rounded-md bg-slate-200 p-2 px-6 text-xl"
              key={item.id}>
              <Text
                aria-label="ChapterName Text"
                className="font-Kufi text-lg font-semibold text-slate-600">
                {item.chapterName}
              </Text>
            </View>
            {item.Lessons.map((item, index) => (
              <View key={index}>
                <View
                  aria-label="Lesson Conatainer"
                  className="group h-12 w-full flex-row-reverse items-center justify-between hover:bg-slate-300">
                  <View
                    aria-label="LessonName container "
                    className="flex-row-reverse items-center justify-end px-4">
                    <LinkIcon size={16} strokeWidth={2.5} className="ml-6 " />
                    <Text
                      aria-label="LessonName Text"
                      className="font-Kufi font-semibold group-hover:text-red-700">
                      {item.lessonName}
                    </Text>
                  </View>
                  <View>
                    <Pressable
                      onPress={() =>
                        isAuth ? Linking.openURL(item.LessonLink) : setModalVisible(true)
                      }>
                      <Text className="pl-4 font-Kufi font-semibold text-red-700">مشاهدة</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            ))}
          </View>
        );
      })}
    </>
  );
};

export default IdContent;
