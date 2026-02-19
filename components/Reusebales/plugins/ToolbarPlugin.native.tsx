import { memo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import type { EnrichedTextInputInstance, OnChangeStateEvent } from 'react-native-enriched';

interface ToolbarPluginProps {
  editorRef: React.RefObject<EnrichedTextInputInstance | null>;
  stylesState: OnChangeStateEvent | null;
}

function ToolbarPlugin({ editorRef, stylesState }: ToolbarPluginProps) {
  const formatBold = () => editorRef.current?.toggleBold();
  const formatItalic = () => editorRef.current?.toggleItalic();
  const formatUnderline = () => editorRef.current?.toggleUnderline();
  const formatStrikethrough = () => editorRef.current?.toggleStrikeThrough();
  const formatCode = () => editorRef.current?.toggleInlineCode();

  const isActive = (style: keyof OnChangeStateEvent) => stylesState?.[style]?.isActive ?? false;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={formatBold}
        style={[styles.button, isActive('bold') && styles.buttonActive]}>
        <Text style={styles.boldText}>B</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={formatItalic}
        style={[styles.button, isActive('italic') && styles.buttonActive]}>
        <Text style={styles.italicText}>I</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={formatUnderline}
        style={[styles.button, isActive('underline') && styles.buttonActive]}>
        <Text style={styles.underlineText}>U</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={formatStrikethrough}
        style={[styles.button, isActive('strikeThrough') && styles.buttonActive]}>
        <Text style={styles.strikethroughText}>S</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={formatCode}
        style={[styles.button, isActive('inlineCode') && styles.buttonActive]}>
        <Text>&lt;/&gt;</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    padding: 8,
  },
  button: {
    marginRight: 4,
    borderRadius: 4,
    padding: 8,
    backgroundColor: 'white',
  },
  buttonActive: {
    backgroundColor: '#d1d5db',
  },
  boldText: {
    fontWeight: 'bold',
  },
  italicText: {
    fontStyle: 'italic',
  },
  underlineText: {
    textDecorationLine: 'underline',
  },
  strikethroughText: {
    textDecorationLine: 'line-through',
  },
});

export default memo(ToolbarPlugin);
