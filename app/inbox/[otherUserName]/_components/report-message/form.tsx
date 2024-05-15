import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea"; // Assuming you have a Textarea component with shadow styling
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { toast } from "sonner";
  

interface ModalFormProps {
    messageId: Id<"messages">,
    reportedFromUserId: Id<"users">,
    reportedUserId: Id<"users">,
    onReported: () => void,
}
const FormSchema = z.object({
    type: z.enum(["outsite-platform-payment", "behaved-inappropriately", "spam", "other"], {
      required_error: "You need to select a notification type.",
    }),
    otherExplanation: z.string().optional(),
}).superRefine((args, ctx) => {
        if(args.type === "other" && !args.otherExplanation){
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ["otherExplanation"],
                fatal: true,
                message:"Please explain what went wrong"

            })
        }
    }
);
  
export function ModalForm({ 
    messageId, 
    reportedFromUserId, 
    reportedUserId, 
    onReported
}:ModalFormProps) {

    const {
        mutate: reportMessage,
        pending
    } = useApiMutation(api.messages.reportMessage)
        
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });

    function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log(data);
        reportMessage({
            messageId,
            reportedFromUserId,
            reportedUserId,
            type: data.type,
            otherExplanation: data.otherExplanation
        })
            .then(() => {
                toast.info("Message reported");
                form.reset();
                onReported();
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const handleRadioChange = () => {
        const otherExplanationValue = form.getValues("otherExplanation");
        if (form.watch("type") !== "other" && otherExplanationValue) {
            form.setValue("otherExplanation", ""); // Clear the value of otherExplanation when type changes
        }
    };

    return (
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
            <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
                <FormItem className="space-y-3">
                <FormControl>
                    <RadioGroup
                    onValueChange={(value) => {
                        field.onChange(value);
                        handleRadioChange(); // Call handleRadioChange on radio group change
                    }}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                    >
                    <FormItem className="flex space-x-3 space-y-0 items-start">
                        <FormControl className="mt-[5px]">
                        <RadioGroupItem value="outsite-platform-payment" />
                        </FormControl>
                        <FormLabel className="text-base font-light text-[#222325]">
                            The user asked for payment or wanted to communicate outside of RiseUpGram
                        </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                        <RadioGroupItem value="behaved-inappropriately" />
                        </FormControl>
                        <FormLabel className="text-base font-light text-[#222325]">
                            The user behaved inappropriately
                        </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                        <RadioGroupItem value="spam" />
                        </FormControl>
                        <FormLabel className="text-base font-light text-[#222325]">
                            The user sent spam
                        </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                        <RadioGroupItem value="other" />
                        </FormControl>
                        <FormLabel className="text-base font-light text-[#222325]">
                            Other
                        </FormLabel>
                    </FormItem>
                    </RadioGroup>
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            {form.watch("type") === "other" && (
            <FormField
                control={form.control}
                name="otherExplanation"
                render={({ field, fieldState }) => (
                <FormItem>
                    <Textarea
                    {...field}
                    className="w-full h-20 border-[#dadbdd] rounded-md resize-none text-base font-light text-[#222325]"
                    maxLength={100}
                    placeholder="Tell us what went wrong"
                    />
                    {fieldState.error && 
                        <div className="pt-[10px]">
                            <span className="text-destructive text-sm font-medium">{fieldState.error?.message}</span> 
                        </div>
                    }
                    <div className="w-full flex justify-end">
                        <p className="text-sm text-[#95979d] mt-[20px]">{`${field.value?.length ?? 0}/100 characters`}</p>
                    </div>
                </FormItem>
                )}
            />
            )}
            <div className="w-full flex justify-end pt-[20px]">
            <Button type="submit" disabled={pending}>Submit</Button>
            </div>
        </form>
        </Form>
    );
}
