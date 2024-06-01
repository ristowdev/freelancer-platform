"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";

import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { languages } from "@/utils/languages";

interface Language {
    label: string;
    value: string;
}

const proficiencyLevels = [
  { label: "Basic", description: "I am only able to communicate in this language through written communication" },
  { label: "Conversational", description: "I know this language well enough to verbally discuss project details with a client" },
  { label: "Fluent", description: "I have complete command of this language with perfect grammar" },
  { label: "Native or Bilingual", description: "I have complete command of this language, including breadth of vocabulary, idioms, and colloquialisms" },
] as const;

const FormSchema = z.object({
  language: z.string({
    required_error: "Please select a language.",
  }),
  proficiencyLevel: z.string({
    required_error: "Please select a proficiency level.",
  }),
});

interface ModalFormProps {
  handleCloseCustom: () => void;
  profile: any;
}

export function ModalForm({
  handleCloseCustom,
  profile
}: ModalFormProps) {
    
    const {
        mutate: addLanguage,
        pending
    } = useApiMutation(api.profile.addLanguage)

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });

    function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log(data)
        addLanguage({
            language: data.language,
            proficiencyLevel: data.proficiencyLevel 
        })
            .then(() => {
                handleCloseCustom()
            })
            .catch((error) => {
                console.error(error);
            });
    }
 
    const [filteredLanguages, setFilteredLanguages] = React.useState<Language[]>([]);

    const filterLanguages = () => {
        if (!profile?.languages) return languages;
        
        return languages.filter(lang => !profile.languages.some((userLang: any) => userLang.language === lang.value));
      };
    
    React.useEffect(() => {
      const filtered = filterLanguages();
      setFilteredLanguages(filtered);
    }, [profile]);

    return (
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex flex-col h-full">
            <div className="flex space-x-4 flex-1">
            <FormField
                control={form.control}
                name="language"
                render={({ field }) => (
                <FormItem className="flex flex-col w-1/2">
                    <FormLabel className="text-base text-black">Language</FormLabel>
                    <Popover>
                    <PopoverTrigger asChild>
                        <FormControl>
                        <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                            "w-full justify-between",
                            !field.value && "text-muted-foreground"
                            )}
                        >
                            {field.value
                            ? filteredLanguages.find(
                                (language) => language.value === field.value
                                )?.label
                            : "Select language"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                        </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[300px] p-0 h-[400px]">
                        <Command>
                        <CommandInput placeholder="Search language..." />
                        <CommandEmpty>No language found.</CommandEmpty>
                        <CommandGroup className="overflow-scroll">
                            {filteredLanguages && filteredLanguages.length > 0 ? (
                            filteredLanguages.map((language) => (
                                <CommandItem
                                value={language.label}
                                key={language.value}
                                onSelect={() => {
                                    form.setValue("language", language.value);
                                }}
                                >
                                <Check
                                    className={cn(
                                    "mr-2 h-4 w-4",
                                    language.value === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                />
                                {language.label}
                                </CommandItem>
                            ))
                            ) : (
                            <CommandEmpty>No language options available.</CommandEmpty>
                            )}
                        </CommandGroup>
                        </Command>
                    </PopoverContent>
                    </Popover> 
                    <FormMessage />
                </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="proficiencyLevel"
                render={({ field }) => (
                <FormItem className="flex flex-col w-1/2">
                    <FormLabel className="text-base text-black">Proficiency Level</FormLabel>
                    <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="w-full justify-between">
                        {field.value
                            ? proficiencyLevels.find(
                                (level) => level.label === field.value
                            )?.label
                            : "Select proficiency level"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-[300px]">
                        <DropdownMenuRadioGroup
                        value={field.value}
                        onValueChange={(value) => field.onChange(value)}
                        >
                        {proficiencyLevels.map((level) => (
                            <DropdownMenuRadioItem
                            key={level.label}
                            value={level.label}
                            className="flex flex-col items-start"
                            >
                            <span className="text-base font-medium">{level.label}</span>
                            <p className="text-sm font-normal">{level.description}</p>
                            </DropdownMenuRadioItem>
                        ))}
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                    </DropdownMenu> 
                    <FormMessage />
                </FormItem>
                )}
            />
            </div>
            <div className="w-full flex justify-end pb-[20px] absolute bottom-[10px] right-[30px]">
                    <Button 
                        type="button" 
                        variant="link" 
                        className="text-base p-0 m-0 text-[#108A00] mr-[25px]"
                        onClick={handleCloseCustom}
                    >
                        Cancel
                    </Button>
                    <Button type="submit" disabled={pending} className="bg-[#108A00] hover:bg-[#0c6300] rounded-full text-base pl-[25px] pr-[25px]">Save</Button>
                </div>
        </form>
        </Form>
    );
}
