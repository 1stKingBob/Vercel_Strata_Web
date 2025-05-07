import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  unitNumber: z.string().min(1, { message: "Please enter your unit number." }),
  category: z.string().min(1, { message: "Please select a category." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
  copyToEmail: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

const ContactForm = () => {
  const { toast } = useToast();
  const [categories, setCategories] = useState<{ value: string; label: string }[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      unitNumber: "",
      category: "",
      message: "",
      copyToEmail: false,
    },
  });

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch('/api/contact');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setCategories(data.categories || []);
      } catch (error) {
        console.error('Error fetching categories:', error);
        toast({
          title: 'Error fetching categories',
          description: 'There was an issue fetching the categories. Please try again later.',
          variant: 'destructive',
        });
      }
    }
    fetchCategories();
  }, []);

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        toast({
          title: "Message sent",
          description: "We've received your message and will respond shortly.",
        });
        form.reset();
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'There was an issue sending your message. Please try again later.',
        variant: 'destructive',
      });
    }
    setIsSubmitting(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Other form fields for name, email, etc. */}
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select {...field}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.length > 0 ? (
                    categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="">No categories available</SelectItem>
                  )}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Submit Button */}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send Message"}
        </Button>
      </form>
    </Form>
  );
};

export default ContactForm;
