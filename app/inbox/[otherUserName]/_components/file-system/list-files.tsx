import Image from 'next/image';
import React from 'react';
import FileBox from './file-box';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

interface ListFilesProps {
  fileList: FileList | null;
  onRemoveFile: (index: number) => void;
  filesUploadProgress: any;
}

const ListFiles: React.FC<ListFilesProps> = ({ fileList, onRemoveFile, filesUploadProgress }) => {

  return (
    <div className="w-full">
      {fileList && fileList.length > 0 && (
        <>
         <div className="w-full flex flex-1 overflow-y-auto pb-[0px]">
            {Array.from(fileList).map((file, index) => (
                <>
                    <FileBox
                        file={file}
                        index={index} 
                        onRemoveFile={onRemoveFile}
                        progress={filesUploadProgress[index]}
                    />
                </>
            ))} 
         </div>
        </>
      ) }
    </div>
  );
};

export default ListFiles;
