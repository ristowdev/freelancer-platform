import React, { useRef, ChangeEvent } from 'react';
import { Paperclip, Plus } from 'lucide-react'; // Assuming Paperclip is the icon you want to use
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
          onClick={handleButtonClick}
          variant="ghost"
          className="h-[33px] text-sm text-[#172b4d] font-normal bg-[#e4e6ea] hover:bg-[#d0d4dc] m-0"
          type="button"
        >
            Upload <Plus size={15} color="#172b4d" className="ml-[5px]"/>
        </Button>
      </div>
    );
};

export default FileUpload;
