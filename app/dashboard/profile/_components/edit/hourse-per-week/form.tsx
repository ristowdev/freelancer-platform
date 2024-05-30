import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea"; // Assuming you have a Textarea component with shadow styling
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
  

interface ModalFormProps { 
    handleCloseCustom: () => void;
    profile: any;
}

const FormSchema = z.object({
        type: z.enum(["More than 30 hrs/week", "Less than 30 hrs/week", "As needed - open to offers"], {
            required_error: "You need to select a notification type.",
        })
    }
)

export function ModalForm({ 
    handleCloseCustom,
    profile
}:ModalFormProps) {

    const {
        mutate: updateHoursePerWeek,
        pending
    } = useApiMutation(api.profile.updateHoursePerWeek)
        
    // const form = useForm<z.infer<typeof FormSchema>>({
    //     resolver: zodResolver(FormSchema),
    // });
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            type: profile.hoursePerWeek || "More than 30 hrs/week" // Default to "More than 30 hrs/week" if no value is provided
        }
    });

    function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log(data.type)
        updateHoursePerWeek({
            hoursePerWeek: data.type
        })
            .then(() => {
                toast.info("Saved."); 
                handleCloseCustom()
            })
            .catch((error) => {
                console.error(error);
            });

    }

    const handleRadioChange = () => {
         
    };

    return (
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 flex flex-col h-full">
            <div className="flex flex-1">
            <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
                <FormItem className="space-y-1">
                <FormControl>
                    <RadioGroup
                    onValueChange={(value) => {
                        field.onChange(value);
                        handleRadioChange(); // Call handleRadioChange on radio group change
                    }}
                    defaultValue={field.value}
                    className="flex flex-col space-y-3"
                    >   

                        <FormItem className="flex space-x-3 space-y-0 items-center">
                            <FormControl className="">
                                <RadioGroupItem value="More than 30 hrs/week"  className="w-[24px] h-[24px]"/>
                            </FormControl>
                            <FormLabel className="text-base font-medium text-[#222325]">
                                More than 30 hrs/week
                            </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0 mt-[50px]">
                            <FormControl>
                                <RadioGroupItem value="Less than 30 hrs/week" className="w-[24px] h-[24px]" />
                            </FormControl>
                            <FormLabel className="text-base font-medium text-[#222325]">
                                Less than 30 hrs/week
                            </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                            <RadioGroupItem value="As needed - open to offers" className="w-[24px] h-[24px]"/>
                            </FormControl>
                            <FormLabel className="text-base font-medium text-[#222325]">
                                As needed - open to offers
                            </FormLabel>
                        </FormItem> 
                    </RadioGroup>
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            </div>
            <div className="w-full flex justify-end pt-[20px]">
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
