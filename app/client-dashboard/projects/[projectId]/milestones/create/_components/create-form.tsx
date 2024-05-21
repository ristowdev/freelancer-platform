"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useFieldArray, useForm } from "react-hook-form" 
import { z } from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { api } from "@/convex/_generated/api"
import { useQuery } from "convex/react"
import { useState } from "react"
import { Doc, Id } from "@/convex/_generated/dataModel"
import { useApiMutation } from "@/hooks/use-api-mutation"
import { useRouter } from "next/navigation"
import RichTextEditor from "@/components/rich-text-editor"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import TasksCRUD from "./tasks/CRUD"

interface CreateFormProps {
}

const TaskSchema = z.object({
    id: z.string(),
    name: z.string().min(1, "Task name is required"),
});

const CreateFormSchema = z.object({
    title: z
        .string()
        .min(20, {
            message: "Title must be at least 20 characters.",
        })
        .max(100, {
            message: "Title must not be longer than 100 characters.",
        }), 
    descriptionShort: z
        .string(),
    descriptionLong: z
        .string()
        .min(20, {
            message: "Title must be at least 20 characters.",
        }), 
    dueDate: z.date({
        required_error: "Please select a due date.",
    }),
    payment: z
        .coerce
        .number(),
    tasks: z.array(TaskSchema),
})

type CreateFormValues = z.infer<typeof CreateFormSchema>

// This can come from your database or API.
const defaultValues: Partial<CreateFormValues> = {
    title: "",
}

export const CreateForm = ({
}: CreateFormProps) => {
    const categories = useQuery(api.categories.get);
    // const [subcategories, setSubcategories] = useState<Doc<"subcategories">[]>([]);
    const {
        mutate,
        pending
    } = useApiMutation(api.projects.create);
    const router = useRouter();

    const form = useForm<CreateFormValues>({
        resolver: zodResolver(CreateFormSchema),
        defaultValues,
        mode: "onChange",
    })

    // function handleCategoryChange(categoryName: string) {
    //     if (categories === undefined) return;
    //     const selectedCategory = categories.find(category => category.name === categoryName);
    //     if (selectedCategory) {
    //         setSubcategories(selectedCategory.subcategories);
    //     }
    // }
    function slugify(title: string) {
        return title.toLowerCase().trim()
            .replace(/\s+/g, '-')       // Replace spaces with -
            .replace(/[^\w\-]+/g, '')   // Remove all non-word chars
            .replace(/\-\-+/g, '-')     // Replace multiple - with single -
            .replace(/^-+/, '')         // Trim - from start of text
            .replace(/-+$/, '');        // Trim - from end of text
    }

    function onSubmit(data: CreateFormValues) {
        console.log(data)
        // const tags = data.tags.split(',').map(tag => tag.trim());
        // const slug = slugify(data.title);
        // mutate({ 
        //     title: data.title,
        //     slug: slug,
        //     experienceLevel: data.experienceLevel,
        //     location: data.location,
        //     priceType: data.priceType,
        //     price: data.price,
        //     tags: tags,
        //     descriptionLong: data.descriptionLong,
        //     descriptionShort: data.descriptionShort,
        //     categoryId: data.categoryId,
        // })
        //     .then((projectId: Id<"projects">) => {
        //         toast.info("Project created successfully");
        //         //form.setValue("title", "");
        //         // router.push(`/seller/${username}/manage-gigs/edit/${projectId}`)
        //     })
        //     .catch(() => {
        //         toast.error("Failed to create gig")
        //     })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control} 
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input placeholder="I will do something amazing" {...field} />
                            </FormControl>
                            <FormDescription>
                                Create book for..
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Controller
                    name="descriptionLong"
                    control={form.control}
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Description Long</FormLabel>
                        <FormControl>
                        <RichTextEditor value={field.value} onChange={field.onChange} />
                        </FormControl>
                        <FormDescription>
                        Detailed description of the milestone
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                    )}
                />

                <FormField
                    control={form.control} 
                    name="descriptionShort"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Short Description</FormLabel>
                            <FormControl>
                                <Input placeholder="Im looking for ..." {...field}  />
                            </FormControl>
                            <FormDescription>
                                Explain milestone short
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="dueDate"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                        <FormLabel>Due date</FormLabel>
                        <Popover>
                            <PopoverTrigger asChild>
                            <FormControl className="w-full">
                                <Button
                                variant={"outline"}
                                className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                )}
                                >
                                {field.value ? (
                                    format(field.value, "PPP")
                                ) : (
                                    <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                            </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                date > new Date() || date < new Date("1900-01-01")
                                }
                                initialFocus
                                className="w-full"
                            />
                            </PopoverContent>
                        </Popover>
                        <FormDescription>
                            Milestone expire at date
                        </FormDescription>
                        <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control} 
                    name="payment"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Payment</FormLabel>
                            <FormControl>
                                <Input placeholder="$15.50" {...field} type="number" />
                            </FormControl>
                            <FormDescription>
                                Payment that you will for this milestone
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Controller
                    name="tasks"
                    control={form.control}
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Tasks</FormLabel>
                        <FormControl>
                        <TasksCRUD onChange={field.onChange} />
                        </FormControl>
                        <FormDescription>
                        Manage the tasks for the milestone
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                    
                {/* <FormField
                    control={form.control} 
                    name="experienceLevel"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Experience Level</FormLabel>
                            <FormControl>
                                <Input placeholder="Begginer" {...field} />
                            </FormControl>
                            <FormDescription>
                                Level of experience requried
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control} 
                    name="location"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Location</FormLabel>
                            <FormControl>
                                <Input placeholder="United States" {...field} />
                            </FormControl>
                            <FormDescription>
                                Project location
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control} 
                    name="priceType"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Price Type</FormLabel>
                            <FormControl>
                                <Input placeholder="Fixed" {...field} />
                            </FormControl>
                            <FormDescription>
                                Price type
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control} 
                    name="price"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Price</FormLabel>
                            <FormControl>
                                <Input placeholder="$15.50" {...field} type="number" />
                            </FormControl>
                            <FormDescription>
                                Price that you will pay
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control} 
                    name="descriptionShort"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Short Description</FormLabel>
                            <FormControl>
                                <Input placeholder="Im looking for ..." {...field}  />
                            </FormControl>
                            <FormDescription>
                                Explain offer better short
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control} 
                    name="descriptionLong"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Long Description</FormLabel>
                            <FormControl>
                                <Input placeholder="Im looking for long ..." {...field}   />
                            </FormControl>
                            <FormDescription>
                                Explain offer better long
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control} 
                    name="tags"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tags</FormLabel>
                            <FormControl>
                                <Input placeholder="AI, ChatGPT, Midjourney" {...field}   />
                            </FormControl>
                            <FormDescription>
                                Separete with comma to create tags e.g: ai,chatgpt
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="categoryId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Category</FormLabel>
                            <Select
                                onValueChange={(categoryName: string) => {
                                    field.onChange(categoryName);
                                    // handleCategoryChange(categoryName);
                                }}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                </FormControl>
                                {categories && (
                                    <SelectContent>
                                        {categories.map((category) => (
                                            <SelectItem key={category._id} value={category._id}>
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                )}
                            </Select>
                            <FormDescription>
                                Select a category most relevant to your service.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                 */}
                <Button type="submit" disabled={pending}>Save</Button>
            </form>
        </Form>
    )
}
