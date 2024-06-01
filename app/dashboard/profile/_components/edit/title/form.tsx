import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"; 
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

interface ModalFormProps { 
    handleCloseCustom: () => void;
    profile: any;
}

const FormSchema = z.object({
        title: z.string().max(70, "Title must be 70 characters or less"),
    }
)

export function ModalForm({ 
    handleCloseCustom,
    profile
}:ModalFormProps) {

    const {
        mutate: updateTitle,
        pending
    } = useApiMutation(api.profile.updateTitle)
        
    // const form = useForm<z.infer<typeof FormSchema>>({
    //     resolver: zodResolver(FormSchema),
    // });
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            title: profile.title || "Enter your title" 
        }
    });

    function onSubmit(data: z.infer<typeof FormSchema>) {
        // console.log(data.type)
        updateTitle({
            title: data.title
        })
            .then(() => {
                toast.info("Saved.");
                handleCloseCustom()
            })
            .catch((error) => {
                console.error(error);
            });

    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 flex flex-col h-full">
                <div className="flex flex-1 w-full">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem className="w-full">
                        <FormLabel className="text-black text-base">Your title</FormLabel>
                        <FormControl className="w-full mt-[10px]">
                            <Input 
                                placeholder="shadcn" 
                                {...field} 
                                className="w-full text-black"
                            />
                        </FormControl> 
                        <FormMessage />
                        </FormItem>
                    )}
                />
                </div>
                <div className="w-full flex justify-end ">
                    <Button 
                        type="button" 
                        variant="link" 
                        className="text-base p-0 m-0 text-[#108A00] mr-[25px]"
                        onClick={handleCloseCustom}
                    >
                        Cancel
                    </Button>
                    <Button type="submit" disabled={pending} className="bg-[#108A00] hover:bg-[#0c6300] rounded-xl text-base pl-[25px] pr-[25px]">Save</Button>
                </div>
            </form>
        </Form>
    );
}
