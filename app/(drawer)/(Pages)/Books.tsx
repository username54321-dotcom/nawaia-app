import Background from '~/components/Background';
import { RichText, Toolbar, useEditorBridge, TenTapStarterKit } from '@10play/tentap-editor';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import TextAlign from '@tiptap/extension-text-align';

const Books = () => {
  const editor = useEditorBridge({
    autofocus: true,
    avoidIosKeyboard: true,
    initialContent: '<p style="text-align: right">ابدأ التحرير!</p>',
    bridgeExtensions: [
      ...TenTapStarterKit,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
  });

  return (
    <Background>
      <View className="w-48 border-2">
        <RichText editor={editor} />
      </View>
      <View>
        <View style={styles.toolbarContainer}>
          <Toolbar editor={editor} />
          <TouchableOpacity
            onPress={() => editor.chain().focus().setTextAlign('right').run()}
            style={styles.customButton}>
            <Text>يمين</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => editor.chain().focus().setTextAlign('center').run()}
            style={styles.customButton}>
            <Text>وسط</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => editor.chain().focus().setTextAlign('left').run()}
            style={styles.customButton}>
            <Text>يسار</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  toolbarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  customButton: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    marginLeft: 8,
  },
});

export default Books;
