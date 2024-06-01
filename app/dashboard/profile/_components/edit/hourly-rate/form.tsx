import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"; 
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { formatAmount } from "@/utils/format-amount";
import { useEffect, useState } from "react";

interface ModalFormProps { 
    handleCloseCustom: () => void;
    profile: any;
}
const FormSchema = z.object({
    hourlyRate: z.coerce.number()
      .min(3, "Please enter a value between $3.00 and $999.00")
      .max(999, "Please enter a value between $3.00 and $999.00"),
  });

export function ModalForm({ 
    handleCloseCustom,
    profile
}:ModalFormProps) {

    const {
        mutate: updateHourlyRate,
        pending
    } = useApiMutation(api.profile.updateHourlyRate)
        
    // const form = useForm<z.infer<typeof FormSchema>>({
    //     resolver: zodResolver(FormSchema),   
    // });
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            hourlyRate: profile.hourlyRate || 0
        }
    });

    function onSubmit(data: z.infer<typeof FormSchema>) {
        // console.log(data.type)
        updateHourlyRate({
            hourlyRate: data.hourlyRate
        })
            .then(() => {
                toast.info("Saved."); 
                handleCloseCustom()
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const { control, handleSubmit } = form;

    const hourlyRate = useWatch({ control, name: "hourlyRate" });

    const [serviceFee, setServiceFee] = useState(0);
    const [totalAmount, setTotalAmount] = useState<string>();
  
    useEffect(() => {
      if (hourlyRate) {
        const fee = (hourlyRate * 0.02).toFixed(2);
        setServiceFee(parseFloat(fee));
        setTotalAmount((hourlyRate - parseFloat(fee)).toFixed(2));
      }
    }, [hourlyRate]);
  

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 flex flex-col h-full">
                <div className="flex flex-1 w-full">
                <div className='flex w-full flex-col'>
                  <div className='mt-[20px] flex w-full'>
                      <span className='flex flex-1 text-base text-black font-medium'>Your profile rate: {formatAmount(profile.hourlyRate)}/hr</span>
                  </div>
                  <div className='mt-[30px] flex flex-col'>
                      <div className='flex border-b solid border-[#d9d9d9] pb-[30px] mb-[30px] relative'>
                        <div className='flex flex-col flex-1'>
                          <span className='text-base font-semibold text-black'>Hourly rate</span>
                          <label className='text-xs text-black'>Total amount the client will see</label>
                        </div>
                        <div className='flex items-center'>

                          <FormField
                            control={form.control}
                            name="hourlyRate"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input 
                                    className='w-[200px] text-right h-[40px] text-black' 
                                    type='number' 
                                    {...field} 
                                    placeholder="$14.50"
                                  />
                                </FormControl> 
                                <div className="absolute left-0 bottom-[5px]">
                                    <FormMessage className="text-md"/>
                                </div>
                              </FormItem>
                            )}
                          />
                          <span className='ml-[10px] text-base text-black'>/hr</span>
                        </div>
                      </div>

                      <div className='flex  items-center border-b solid border-[#d9d9d9] pb-[30px] mb-[30px]'>
                        <div className='flex flex-col flex-1'>
                          <span className='text-base font-semibold text-black'>2% Freelancer Service Fee</span>
                          {/* <label className='text-sm text-[#676767]'>Total amount the client will see on your proposal</label> */}
                        </div>
                        <div className='flex items-center'>
                          <span className='text-base text-[#575757]'>-${serviceFee}</span> 
                           <span className='ml-[10px] text-base text-black'>/hr</span>
                        </div>
                      </div>

                      <div className='flex '>
                        <div className='flex flex-col flex-1'>
                          <span className='text-base font-semibold text-black'>{"You'll receive"}</span>
                          <label className='text-xs text-black'>{"The estimated amount you'll receive after service fees"}</label>
                        </div>
                        <div className='flex items-center'>
                          <Input className='w-[200px] text-right h-[40px]' value={formatAmount(totalAmount || 0)}  disabled/> 
                          <span className='ml-[10px] text-base text-black'>/hr</span>
                        </div>
                      </div>
                  </div>
                </div>
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
