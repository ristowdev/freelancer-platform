import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { FC } from 'react';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const RichTextEditor: FC<RichTextEditorProps> = ({ value, onChange }) => {
  return (
    <ReactQuill value={value} onChange={onChange} />
  );
};

export default RichTextEditor;
