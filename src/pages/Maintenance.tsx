Thanks for clarifying the path! src/pages/Maintenance.tsx is the standard location for a page using the Pages Router in Next.js.

The code I provided is still valid for that path. The use of useState and useEffect makes it a client-side component, which is perfectly fine within the pages directory.

Here is the code again, confirmed for src/pages/Maintenance.tsx. The content is identical to the previous response, as the core logic of interacting with the /api/maintenance endpoint remains the same regardless of whether you're using the Pages Router (pages/) or App Router (app/).

TypeScript

// src/pages/Maintenance.tsx
'use client'; // Keep this directive as you're using client-side hooks

import { useState, useEffect } from "react"; // Import useEffect
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Wrench, CheckCircle, Clock, AlertTriangle, Printer, Building } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Define a type for your maintenance items for better type safety
interface MaintenanceItem {
  type: string;
  task: string;
  date: string;
  status: string;
}

const Maintenance = () => {
  const { toast } = useToast();
  const [issueSubject, setIssueSubject] = useState("");
  const [issueType, setIssueType] = useState("");
  const [issueLocation, setIssueLocation] = useState("");
  const [issueDescription, setIssueDescription] = useState("");
  // Change upcomingMaintenance from a static array to a state variable
  const [upcomingMaintenance, setUpcomingMaintenance] = useState<MaintenanceItem[]>([]);

  // Static data for recently completed maintenance (assuming this doesn't need API interaction for now)
  const recentMaintenance = [
    {
      type: "Regular",
      task: "Garden Maintenance",
      date: "March 30, 2025",
      status: "Completed"
    },
    {
      type: "Repair",
      task: "Garage Door Adjustment",
      date: "March 25, 2025",
      status: "Completed"
    },
    {
      type: "Emergency",
      task: "Water Leak in Common Area",
      date: "March 20, 2025",
      status: "Resolved"
    }
  ];

  // Function to fetch upcoming maintenance data
  const fetchUpcomingMaintenance = async () => {
    try {
      const response = await fetch('/api/maintenance', { // Fetch from your API endpoint
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch maintenance items');
      }

      const data: MaintenanceItem[] = await response.json();
      setUpcomingMaintenance(data); // Update the state with fetched data
    } catch (error: any) {
      console.error("Error fetching upcoming maintenance:", error);
      toast({
        title: "Error fetching data",
        description: error.message || "Could not load upcoming maintenance.",
        variant: "destructive",
      });
    }
  };

  // Use useEffect to fetch data when the component mounts
  useEffect(() => {
    fetchUpcomingMaintenance();
  }, []); // Empty dependency array means this runs only once on mount

  // Modify handleSubmit to send data to the API
  const handleSubmit = async (e: React.FormEvent) => { // Made async
    e.preventDefault();

    if (!issueSubject || !issueType || !issueLocation || !issueDescription) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    // Prepare data to send
    const formData = {
      issueSubject,
      issueType,
      issueLocation,
      issueDescription,
    };

    try {
      // Send the POST request to your API endpoint
      const response = await fetch('/api/maintenance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Send the form data as JSON
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Success:', result);

      toast({
        title: "Maintenance request submitted",
        description: "Your request has been received and scheduled.",
      });

      // **Fetch the updated list after successful submission**
      fetchUpcomingMaintenance();

      // Reset form fields
      setIssueSubject("");
      setIssueType("");
      setIssueLocation("");
      setIssueDescription("");

    } catch (error: any) {
      console.error('Error submitting maintenance request:', error);
      toast({
        title: "Submission failed",
        description: error.message || "There was an error submitting your request.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-6 text-center">Maintenance Portal</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Calendar className="mr-2 h-6 w-6" />
            Upcoming Maintenance
          </h2>

          <div className="space-y-4">
            {/* Render items from the upcomingMaintenance state */}
            {upcomingMaintenance.map((item, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{item.task}</CardTitle>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {item.type}
                    </span>
                  </div>
                  <CardDescription className="flex items-center">
                    <Clock className="mr-1 h-4 w-4" />
                    {item.date}
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <div className="flex items-center text-sm text-muted-foreground">
                     {/* Use lowercase "scheduled" from backend */}
                    {item.status === "scheduled" ? (
                      <><CheckCircle className="mr-1 h-4 w-4 text-green-500" /> {item.status}</>
                    ) : (
                       <><AlertTriangle className="mr-1 h-4 w-4 text-yellow-500" /> {item.status}</>
                    )}
                  </div>
                </CardFooter>
              </Card>
            ))}
             {upcomingMaintenance.length === 0 && (
                <p className="text-center text-muted-foreground">No upcoming maintenance scheduled.</p>
             )}
          </div>

          <h2 className="text-2xl font-semibold mb-4 mt-8 flex items-center">
            <CheckCircle className="mr-2 h-6 w-6" />
            Recently Completed
          </h2>

          <div className="space-y-4">
            {recentMaintenance.map((item, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{item.task}</CardTitle>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          item.type === "Emergency"
                            ? "bg-red-100 text-red-800"
                            : item.type === "Repair"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                      }`}
                    >
                      {item.type}
                    </span>
                  </div>
                  <CardDescription className="flex items-center">
                    <Clock className="mr-1 h-4 w-4" />
                    {item.date}
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <CheckCircle className="mr-1 h-4 w-4 text-green-500" /> {item.status}
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Wrench className="mr-2 h-6 w-6" />
            Report a Maintenance Issue
          </h2>

          <Card>
            <CardHeader>
              <CardTitle>Maintenance Request Form</CardTitle>
              <CardDescription>
                Use this form to report issues in common areas that require attention.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Input fields remain the same, controlled by state */}
                <div className="space-y-2">
                  <Label htmlFor="issue-subject">Subject</Label>
                  <Textarea
                    id="issue-subject"
                    placeholder="Subject of the issue..."
                    className="h-10 min-h-0 resize-none px-3 py-2 text-sm leading-none"
                    value={issueSubject}
                    onChange={(e) => setIssueSubject(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="issue-type">Type of Issue</Label>
                  <Select value={issueType} onValueChange={setIssueType}>
                    <SelectTrigger id="issue-type">
                      <SelectValue placeholder="Select issue type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="plumbing">Plumbing</SelectItem>
                      <SelectItem value="electrical">Electrical</SelectItem>
                      <SelectItem value="structural">Structural</SelectItem>
                      <SelectItem value="cleaning">Cleaning</SelectItem>
                      <SelectItem value="security">Security</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="issue-location">Location</Label>
                  <Select value={issueLocation} onValueChange={setIssueLocation}>
                    <SelectTrigger id="issue-location">
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="entrance">Main Entrance</SelectItem>
                      <SelectItem value="lobby">Lobby</SelectItem>
                      <SelectItem value="hallway">Hallways</SelectItem>
                      <SelectItem value="stairs">Stairwell</SelectItem>
                      <SelectItem value="elevator">Elevator</SelectItem>
                      <SelectItem value="parking">Parking Area</SelectItem>
                      <SelectItem value="garden">Garden/Outdoor Area</SelectItem>
                      <SelectItem value="roof">Roof</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="issue-description">Description</Label>
                  <Textarea
                    id="issue-description"
                    placeholder="Please provide details about the issue..."
                    rows={4}
                    value={issueDescription}
                    onChange={(e) => setIssueDescription(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="issue-photo">Photo (optional)</Label>
                  <Input
                    id="issue-photo"
                    type="file"
                    accept="image/*"
                    // You would handle file uploads separately
                  />
                </div>
                 {/* The submit button is part of the form */}
                <Button type="submit" className="w-full">Submit Maintenance Request</Button>
              </form>
            </CardContent>
          </Card>

          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Printer className="mr-2 h-5 w-5" />
              Print Maintenance Resources
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button variant="outline" asChild className="flex items-center justify-center">
                <a href="#print" target="_blank">
                  <Building className="mr-2 h-4 w-4" />
                  Emergency Contact List
                </a>
              </Button>
              <Button variant="outline" asChild className="flex items-center justify-center">
                <a href="#print" target="_blank">
                  <Wrench className="mr-2 h-4 w-4" />
                  Approved Contractor List
                </a>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Maintenance;
