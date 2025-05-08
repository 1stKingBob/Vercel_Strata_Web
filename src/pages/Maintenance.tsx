
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Wrench, CheckCircle, Clock, AlertTriangle, Printer, Building } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Maintenance = () => {
  const { toast } = useToast();
  const [issueSubject, setIssueSubject] = useState("");
  const [issueType, setIssueType] = useState("");
  const [issueLocation, setIssueLocation] = useState("");
  const [issueDescription, setIssueDescription] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!issueType || !issueLocation || !issueDescription) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }
    
    // This would normally submit to a server
    toast({
      title: "Maintenance request submitted",
      description: "Your request has been received and will be reviewed shortly.",
    });
    
    // Reset form
    setIssueSubject("");
    setIssueType("");
    setIssueLocation("");
    setIssueDescription("");
  };
  
  const upcomingMaintenance = [
    {
      type: "Regular",
      task: "Building Exterior Cleaning",
      date: "April 15, 2025",
      status: "Scheduled"
    },
    {
      type: "Inspection",
      task: "Fire Safety Equipment Check",
      date: "April 22, 2025",
      status: "Scheduled"
    },
    {
      type: "Repair",
      task: "Lobby Lighting Replacement",
      date: "April 28, 2025",
      status: "Pending Parts"
    }
  ];
  
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
                    {item.status === "Scheduled" ? (
                      <><CheckCircle className="mr-1 h-4 w-4 text-green-500" /> {item.status}</>
                    ) : (
                      <><AlertTriangle className="mr-1 h-4 w-4 text-yellow-500" /> {item.status}</>
                    )}
                  </div>
                </CardFooter>
              </Card>
            ))}
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
                  />
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSubmit} className="w-full">Submit Maintenance Request</Button>
            </CardFooter>
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
