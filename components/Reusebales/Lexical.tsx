import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table';
import { ListItemNode, ListNode } from '@lexical/list';
import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import ToolbarPlugin from './plugins/ToolbarPlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { memo, useEffect, useRef } from 'react';
import { $getRoot, $insertNodes } from 'lexical';
import { $generateHtmlFromNodes, $generateNodesFromDOM } from '@lexical/html';

import { theme } from './plugins/EditorTheme';

// import TreeViewPlugin from './plugins/TreeViewPlugin';
const placeholder = 'دوّن مذكراتك';
const editorConfig = {
  namespace: 'Notes Editor',
  theme: theme,
  nodes: [
    HeadingNode,
    ListNode,
    ListItemNode,
    QuoteNode,
    CodeNode,
    CodeHighlightNode,
    TableNode,
    TableCellNode,
    TableRowNode,
    AutoLinkNode,
    LinkNode,
  ],

  onError(error: Error) {
    throw error;
  },
};
interface OnChangePluginProps {
  onChange?: (text: string) => void;
  onStateChange?: (state: { json: object; html: string }) => void;
}

function OnChangePlugin({ onChange, onStateChange }: OnChangePluginProps) {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        if (onChange) {
          const text = $getRoot().getTextContent();
          onChange(text);
        }
        if (onStateChange) {
          const json = editorState.toJSON();
          const html = $generateHtmlFromNodes(editor, null);
          onStateChange({ json, html });
        }
      });
    });
  }, [editor, onChange, onStateChange]);
  return null;
}

function SetInitialStatePlugin({ html }: { html: string }) {
  const [editor] = useLexicalComposerContext();
  const hasSetInitialHtml = useRef(false);

  useEffect(() => {
    if (html && !hasSetInitialHtml.current) {
      hasSetInitialHtml.current = true;
      editor.update(() => {
        const parser = new DOMParser();
        const dom = parser.parseFromString(html, 'text/html');
        const nodes = $generateNodesFromDOM(editor, dom);
        $getRoot().select();
        $insertNodes(nodes);
      });
    }
  }, [editor, html]);

  return null;
}
interface LexicalPropTypes {
  onChange?: (text: string) => void;
  onStateChange?: (state: { json: object; html: string }) => void;
  initialHtml?: string | null;
}
function Lexical({ onChange, onStateChange, initialHtml }: LexicalPropTypes) {
  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className=" w-full bg-white">
        <ToolbarPlugin />
        <div className="relative rounded-b-md border-2 border-t-0">
          <RichTextPlugin
            contentEditable={
              <ContentEditable
                className=" max-h-[300px] min-h-[150px] overflow-y-auto whitespace-pre-wrap break-words p-2 leading-normal caret-black outline-none"
                aria-placeholder={placeholder}
                placeholder={
                  <div className="pointer-events-none absolute left-2 top-2 select-none text-gray-400">
                    {placeholder}
                  </div>
                }
              />
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          {/* <AutoFocusPlugin /> */}
          {/* <TreeViewPlugin /> */}
          <OnChangePlugin onChange={onChange} onStateChange={onStateChange} />
          {initialHtml && <SetInitialStatePlugin html={initialHtml} />}
        </div>
      </div>
    </LexicalComposer>
  );
}
export default memo(Lexical);
