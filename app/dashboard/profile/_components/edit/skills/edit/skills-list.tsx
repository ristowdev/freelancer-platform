import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { api } from '@/convex/_generated/api';
import { useApiMutation } from '@/hooks/use-api-mutation';
import { getLanguageLabel } from '@/utils/languages';
import { Trash } from 'lucide-react';
import React, { useState } from 'react';

interface LanguageListProps {
  handleCloseCustom: () => void;
  profile: any;
}

interface Skill {
  _id: string;
  name: string;
}

function SkillsList({ handleCloseCustom, profile }: LanguageListProps) {
    const [languagesToDelete, setLanguagesToDelete] = useState<any[]>([]);

    const {
        mutate: _deleteSkills,
        pending
    } = useApiMutation(api.profile.deleteSkills)

    const handleDeleteLanguage = (language: any) => {
        setLanguagesToDelete(prevState => [...prevState, language]);
    };

    const handleSave = () => {
        // Call API or perform any other action here
        _deleteSkills({
            skills: languagesToDelete,
        })
            .then(() => {
                handleCloseCustom()
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <div className="flex flex-col w-full h-full">
        <div className="w-full flex flex-1">
            <div className="w-full">
            <div className="w-full flex">
                <div className="w-full">
                <span className="text-base font-medium text-black">Skill</span>
                </div> 
                <div className="w-[10%] flex justify-end"></div>
            </div>
            {profile?.skills
                .filter((skill: Skill) => !languagesToDelete.some(_skill => _skill.name === skill.name))
                .map((skill: Skill) => (
                <div className="flex mt-[20px] border-b border-[#d9d9d9] pb-[20px]" key={skill._id}>
                    <div className="w-full">
                        <Input
                            value={skill.name}
                            readOnly
                            className="focus focus-visible:ring-0 text-[#a5a5a5] bg-[#e9e9e9] border border-[#e9e9e9] "
                        /> 
                    </div>
                    <div className="w-[10%] flex justify-end">
                    <Button
                        variant="outline"
                        size="icon"
                        className="border-[2px] border-[#118a00] rounded-full p-[6px] m-0 w-[32px] h-[32px] ml-[15px]"
                        onClick={() => handleDeleteLanguage(skill)}
                    >
                        <Trash color="#118a00" size={30} />
                    </Button>
                    </div>
                </div>
                ))}
            </div>
        </div>
        <div className="w-full flex justify-end pb-[20px] sticky bottom-0 left-0 bg-white pt-[20px]">
            <Button
            type="button"
            variant="link"
            className="text-base p-0 m-0 text-[#108A00] mr-[25px]"
            onClick={handleCloseCustom}
            >
            Cancel
            </Button>
            <Button
            type="button"
            disabled={pending}
            className="bg-[#108A00] hover:bg-[#0c6300] rounded-full text-base pl-[25px] pr-[25px]"
            onClick={handleSave}
            >
            Save
            </Button>
        </div>
        </div>
    );
}

export default SkillsList;
