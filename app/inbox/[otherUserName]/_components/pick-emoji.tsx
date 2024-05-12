import { Button } from '@/components/ui/button';
import EmojiPicker from 'emoji-picker-react';
import { Smile } from 'lucide-react';
import { useState } from 'react';


interface FormProps {
    onEmojiSelect: (emoji: any) => void;
}
 
const PickEmoji = ({
    onEmojiSelect,
}: FormProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    return(
        <>
            <div className="relative items-center flex">
                <Button 
                    size="icon"
                    variant="ghost"
                    className="hover:bg-transparent p-0 m-0 w-auto h-auto"
                    onClick={()=>{setIsOpen(!isOpen)}}
                >
                    <Smile color="#74767e" size={20}/>
                </Button>
                
                {isOpen && 
                    <div className='absolute bottom-0 left-0 mb-[30px]'>
                        <EmojiPicker 
                            onEmojiClick={(emoji)=> {
                                setIsOpen(false);
                                onEmojiSelect(emoji)
                            }}
                        />
                    </div>
                }

            </div>
        </>
    )
}
export default PickEmoji;