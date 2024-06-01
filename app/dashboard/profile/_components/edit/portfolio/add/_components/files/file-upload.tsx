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
        className="m-0 w-full h-[100px] bg-white border border-dashed border-[#14a800] hover:bg-[#f0f0f0] text-[#14a800]"
        onClick={handleButtonClick}
        type="button"
      > 
          Upload file
          <Paperclip color="#14a800" size={15} className='ml-[5px]'/> 
      </Button>
    </div>
  );
};

export default FileUpload;
