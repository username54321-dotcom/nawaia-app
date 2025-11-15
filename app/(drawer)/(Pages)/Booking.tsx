import { View, Text, Pressable, Linking } from 'react-native';
import Background from '~/components/Background';
import { DotLottie } from '@lottiefiles/dotlottie-react-native';

const Booking = () => {
  return (
    <Background>
      <View className=" items-center justify-center">
        <View className=" my-6 items-center justify-center self-center">
          <Text className="mx-6 font-Kufi text-base xl:w-1/3">
            {`
اتت فكرة تقديم الاستشارة اون لاين مواكبة للعصر وايضاً لان لديها الكثير من المميزات حيث يمكنكم طلب الاستشارة وانت جالس في منزلك دون ان تتكلف أعباء الخروج من المنزل، وايضاً الوقت، حيث يمكنكم اخذ الاستشارة خارج توقيت ساعات دوام العمل الرسمي، و تتميز بالسرية حيث تبقى الهوية الحقيقية لطالب الاستشارة غير معلنة، لان الاستشارة ستكون عبر خدمة السكايب فقط صوتياً، بدون ضرورة فتح الكاميرا، وبهذا تستطيع التعبير عن نفسك بأريحية اكبر.  

ولضمان حقوق طالب الاستشارة والمستشار معا، انا لدي ترخيص واعمل من ضمن جمعية المعالجين النفسيين البريطانيين (BACP) والتي لا تعطي الترخيص الا لمن هو مؤهل أكاديمياً ومهنياً ونفسياً لتقديم الاستشارة، وايضا هي جمعية تتميز بقانون أخلاقي صارم لضمان عدم العبث بحقوق الطرفين وخاصة ضمان الخصوصية والسرية لكل ما يشارك به طالب الاستشارة . 

 

اقدم الاستشارة ضمن بيئة آمنة وصحية .أسعى من خلال عملي لتحقيق الوضوح والنضج والإبداع و المساعدة على تحمل المسؤولية، مع وجود منظور محايد في تقديم الاستشارة يشمل توجيه المشورة التكاملي لإيجاد الطرق المساعدة لتخفيف الأعراض وايضاً للاكتشاف معك ما تعنيه حياتك بالنسبة لك والاحتمالات الممكنة وكيفية استجابتك للأحداث و عبر التنقيب المشترك والاعتراف بالقيود وبالنقاط الضعف والقوة . 

 

وهذه هي الأمور المتخصصة بها :  

١- نوبات الهلع  

٢- الضغوطات النفسية 

٣- مشاكل في العلاقات 

٤- التوتر والقلق 

٥- الفقدان والخسارة 

٦- الاكتئاب 

٧- مشاكل عالقة منذ ايام الطفولة  

٨- فقدان معنى الحياة  

٩- أذية النفس `}
          </Text>
        </View>
        <Pressable
          onPress={() => Linking.openURL('https://wa.me/971589235048')}
          className="group h-12 flex-row items-center justify-center rounded-full border-[1px] border-neutral-700 bg-neutral-200 pr-6 transition-all duration-200  hover:bg-neutral-600">
          <View className=" absolute left-0 -translate-x-10">
            <DotLottie
              autoplay={true}
              useFrameInterpolation={true}
              loop={true}
              source={require('~/assets/lottie/whatsapp loop.lottie')}
              style={{ width: 100, height: 100 }}></DotLottie>
          </View>
          <Text className="ml-10 font-Kufi text-xl font-semibold text-neutral-800 transition-all duration-200 group-hover:text-neutral-200">
            أحجز أستشارتك{' '}
          </Text>
        </Pressable>
      </View>
    </Background>
  );
};

export default Booking;
