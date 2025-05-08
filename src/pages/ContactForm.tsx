import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  unitNumber: z.string().min(1, { message: "Please enter your unit number." }),
  category: z.string({ required_error: "Please select a category." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
  copyToEmail: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

const ContactForm = () => {
  const { toast } = useToast();
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

  function onSubmit(values: FormValues) {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log(values);
      toast({
        title: "Message sent",
        description: "We've received your message and will respond shortly.",
      });
      form.reset();
      setIsSubmitting(false);
    }, 1000);
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-6 text-center">Contact the Strata Committee</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Send us a message</CardTitle>
              <CardDescription>
                The committee will respond to your inquiry within 2-3 business days.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Your email address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="unitNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Unit Number</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. 101" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="general">General Inquiry</SelectItem>
                              <SelectItem value="maintenance">Maintenance Request</SelectItem>
                              <SelectItem value="noise">Noise Complaint</SelectItem>
                              <SelectItem value="bylaws">By-law Query</SelectItem>
                              <SelectItem value="financial">Financial Question</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Please provide details of your inquiry..." 
                            rows={5}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="copyToEmail"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Send a copy to my email</FormLabel>
                          <FormDescription>
                            You'll receive a copy of your message for your records.
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" disabled={isSubmitting} className="w-full">
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start">
                <Mail className="h-5 w-5 mr-3 mt-0.5 text-primary" />
                <div>
                  <p className="font-medium">Email</p>
                  <a href="mailto:committee@horizonstrata.com.au" className="text-primary hover:underline">
                    committee@horizonstrata.com.au
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <Phone className="h-5 w-5 mr-3 mt-0.5 text-primary" />
                <div>
                  <p className="font-medium">Emergency Contact</p>
                  <a href="tel:+61234567890" className="text-primary hover:underline">
                    +61 2 3456 7890
                  </a>
                  <p className="text-sm text-muted-foreground">For urgent matters only</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 mt-0.5 text-primary" />
                <div>
                  <p className="font-medium">Address</p>
                  <p>123 Strata Lane</p>
                  <p>Sydney, NSW 2000</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Clock className="h-5 w-5 mr-3 mt-0.5 text-primary" />
                <div>
                  <p className="font-medium">Committee Response Times</p>
                  <p className="text-sm text-muted-foreground">
                    The volunteer committee checks messages regularly. Please allow 2-3 business days for a response.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Urgent Issues</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">For urgent building emergencies outside business hours:</p>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Water leaks affecting multiple units</li>
                <li>Power outages in common areas</li>
                <li>Fire alarms or security breaches</li>
                <li>Lift breakdowns with people trapped</li>
              </ol>
              <div className="mt-4 bg-red-50 p-4 rounded-md">
                <p className="font-semibold text-red-700">Emergency Contact:</p>
                <p className="text-red-700">Building Manager On-Call: +61 4 0000 0000</p>
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">
                For all other issues, please use the contact form or email.
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
    </Form>
  );
}
