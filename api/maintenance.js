import { VercelRequest, VercelResponse } from '@vercel/node';

// In a real application, this data would come from and be stored in a database.
// This array is for demonstration purposes ONLY and will not persist data across requests.
let mockUpcomingMaintenance = [
  {
    type: "Regular",
    task: "Building Exterior Cleaning",
    date: "April 15, 2025", // Example date, you'd calculate this dynamically or fetch from DB
    status: "Scheduled"
  },
  {
    type: "Inspection",
    task: "Fire Safety Equipment Check",
    date: "April 22, 2025", // Example date
    status: "Scheduled"
  },
  {
    type: "Repair",
    task: "Lobby Lighting Replacement",
    date: "April 28, 2025", // Example date
    status: "Pending Parts"
  }
];

export default async function handler(req, res) {
  // Handle GET requests to retrieve maintenance items
  if (req.method === 'GET') {
    try {
      // In a real application, fetch the data from your database here
      // const upcomingMaintenance = await db.getUpcomingMaintenance();

      // For demonstration, returning the mock data
      res.status(200).json(mockUpcomingMaintenance);
    } catch (error) {
      console.error('Error fetching maintenance items:', error);
      res.status(500).json({ message: 'Failed to fetch maintenance items' });
    }

  // Handle POST requests to add a new maintenance item
  } else if (req.method === 'POST') {
    try {
      const { issueSubject } = req.body; // Extract issueSubject from the request body

      // Basic validation
      if (!issueSubject) {
        return res.status(400).json({ message: 'Issue subject is required' });
      }

      // Calculate date 5 days from now
      const currentDate = new Date();
      const scheduledDate = new Date(currentDate);
      scheduledDate.setDate(currentDate.getDate() + 5);

      // Format the date as "Month Day, Year"
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      const formattedDate = scheduledDate.toLocaleDateString('en-US', options);

      // Create the new maintenance item object
      const newMaintenanceItem = {
        type: "Repair",
        task: issueSubject, // Use the submitted subject as the task
        date: formattedDate,
        status: "scheduled"
      };

      // In a real application, you would save this new item to your database here
      // await db.addMaintenanceItem(newMaintenanceItem);

      // For demonstration, add to the mock array (this is NOT persistent)
      mockUpcomingMaintenance.push(newMaintenanceItem);

      // Send a success response
      res.status(201).json({
        message: 'Maintenance request successfully scheduled',
        item: newMaintenanceItem // Optionally return the created item
      });

    } catch (error) {
      console.error('Error processing maintenance request:', error);
      res.status(500).json({ message: 'Failed to schedule maintenance request' });
    }

  // Handle requests with any other HTTP method
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
