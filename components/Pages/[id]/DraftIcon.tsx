import { Pressable } from 'react-native';
import React from 'react';
import { NotebookPen } from 'lucide-react-native';
import tw from 'twrnc';
interface propTypes {
  setExpand: React.Dispatch<React.SetStateAction<boolean>>;
}
const DraftIcon = ({ setExpand }: propTypes) => {
  return (
    <Pressable role="button" accessibilityLabel="Toggle Draft" onPress={() => setExpand((v) => !v)}>
      <NotebookPen color={tw.color('red-700')} className="ml-4 rounded-md "></NotebookPen>
    </Pressable>
  );
};

export default DraftIcon;
