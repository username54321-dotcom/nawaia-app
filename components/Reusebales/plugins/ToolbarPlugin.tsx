import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useCallback, useEffect, useState } from 'react';
import {
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  $getSelection,
  $isElementNode,
  $isRangeSelection,
} from 'lexical';
import { View, Text, TouchableOpacity } from 'react-native';
import { AlignCenter, AlignLeft, AlignRight, Highlighter } from 'lucide-react-native';

export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isHighlight, setIsHighlight] = useState(false);
  const [isCode, setIsCode] = useState(false);
  const [elementFormat, setElementFormat] = useState('left');

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      // Text formatting
      setIsBold(selection.hasFormat('bold'));
      setIsItalic(selection.hasFormat('italic'));
      setIsUnderline(selection.hasFormat('underline'));
      setIsHighlight(selection.hasFormat('highlight'));
      setIsCode(selection.hasFormat('code'));

      // Element formatting
      const anchorNode = selection.anchor.getNode();
      const element =
        anchorNode.getKey() === 'root' ? anchorNode : anchorNode.getTopLevelElementOrThrow();

      if ($isElementNode(element)) {
        setElementFormat(element.getFormatType());
      }
    }
  }, [editor]);

  useEffect(() => {
    const unregister = editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        updateToolbar();
      });
    });
    return unregister;
  }, [editor, updateToolbar]);

  const formatText = (format: 'bold' | 'italic' | 'underline' | 'highlight' | 'code') => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, format);
  };

  const formatElement = (format: 'left' | 'center' | 'right') => {
    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, format);
  };

  return (
    <View className="flex-row items-center justify-center border-b border-gray-200 bg-gray-100 p-2">
      <TouchableOpacity
        onPress={() => formatText('bold')}
        className={`mr-1 rounded p-2 ${isBold ? 'bg-gray-300' : 'bg-white'}`}>
        <Text className="font-bold">B</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => formatText('italic')}
        className={`mr-1 rounded p-2 ${isItalic ? 'bg-gray-300' : 'bg-white'}`}>
        <Text className="italic">I</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => formatText('underline')}
        className={`mr-1 rounded p-2 ${isUnderline ? 'bg-gray-300' : 'bg-white'}`}>
        <Text style={{ textDecorationLine: 'underline' }}>U</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => formatText('highlight')}
        className={`mr-1 rounded p-2 ${isHighlight ? 'bg-gray-300' : 'bg-white'}`}>
        <Highlighter size={20} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => formatText('code')}
        className={`mr-1 rounded p-2 ${isCode ? 'bg-gray-300' : 'bg-white'}`}>
        <Text>&lt;/&gt;</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => formatElement('left')}
        className={`mr-1 rounded p-2 ${elementFormat === 'left' ? 'bg-gray-300' : 'bg-white'}`}>
        <AlignLeft size={20} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => formatElement('center')}
        className={`mr-1 rounded p-2 ${elementFormat === 'center' ? 'bg-gray-300' : 'bg-white'}`}>
        <AlignCenter size={20} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => formatElement('right')}
        className={`rounded p-2 ${elementFormat === 'right' ? 'bg-gray-300' : 'bg-white'}`}>
        <AlignRight size={20} color="black" />
      </TouchableOpacity>
    </View>
  );
}
