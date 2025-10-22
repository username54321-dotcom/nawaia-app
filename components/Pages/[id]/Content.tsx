import { Link, useRouter } from 'expo-router';
import { LinkIcon } from 'lucide-react-native';
import { View, Text } from 'react-native';

const IdContent = ({ data }: { data: any }) => {
  const router = useRouter();
  const content = data[0].content;

  return (
    <>
      {content.map((item, index) => {
        return (
          <>
            <View
              aria-label="ChapterName Container"
              className="m-2  h-12 w-full items-center self-center rounded-md bg-slate-200 p-2 px-6 text-xl">
              <Text
                aria-label="ChapterName Text"
                className="font-Kufi text-lg font-semibold text-slate-600">
                {item.chapterName}
              </Text>
            </View>
            {item.Lessons.map((item, index) => (
              <>
                <View
                  aria-label="Lesson Conatainer"
                  id={index}
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
                    <Link href={item.LessonLink} target="_blank">
                      <Text className="pl-4 font-Kufi font-semibold text-red-700">مشاهدة</Text>
                    </Link>
                  </View>
                </View>
              </>
            ))}
          </>
        );
      })}
    </>
  );
};

export default IdContent;
