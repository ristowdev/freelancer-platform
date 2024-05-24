import React, { useRef, ChangeEvent } from 'react';
import { Paperclip } from 'lucide-react'; // Assuming Paperclip is the icon you want to use
import { Button } from '@/components/ui/button';

interface FileUploadProps {
  onFileSelect: (files: FileList | null) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    onFileSelect(files); 
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); 
    }
  };

  return (
    <div className='flex items-center'>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileInputChange}
          multiple  // Allow multiple file selection
        />
        <Button
          size="icon"
          variant="ghost"
          className="hover:bg-transparent p-0 m-0 w-[20px] h-[20px] ml-[10px]"
          onClick={handleButtonClick}
        >
          <Paperclip color="#74767e" size={20}/>
        </Button>
    </div>
  );
};

export default FileUpload;
