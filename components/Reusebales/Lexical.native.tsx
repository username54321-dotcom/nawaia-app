import { memo, useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  EnrichedTextInput,
  EnrichedTextInputInstance,
  OnChangeStateEvent,
} from 'react-native-enriched';
import ToolbarPlugin from './plugins/ToolbarPlugin.native';

interface LexicalPropTypes {
  initialHtml?: string | null;
  onStateChange?: (state: { html: string }) => void;
}

function Lexical({ initialHtml, onStateChange }: LexicalPropTypes) {
  const editorRef = useRef<EnrichedTextInputInstance | null>(null);
  const [stylesState, setStylesState] = useState<OnChangeStateEvent | null>(null);

  return (
    <View style={styles.container}>
      <ToolbarPlugin editorRef={editorRef} stylesState={stylesState} />
      <View style={styles.editorWrapper}>
        <EnrichedTextInput
          ref={editorRef}
          defaultValue={initialHtml ?? ''}
          placeholder="دوّن مذكراتك"
          onChangeHtml={(e) => {
            onStateChange?.({ html: e.nativeEvent.value });
          }}
          onChangeState={(e) => {
            setStylesState(e.nativeEvent);
          }}
          style={styles.input}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'white',
  },
  editorWrapper: {
    borderWidth: 2,
    borderTopWidth: 0,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderColor: '#e5e7eb',
  },
  input: {
    minHeight: 150,
    maxHeight: 300,
    padding: 8,
    fontSize: 16,
    lineHeight: 24,
  },
});

export default memo(Lexical);
