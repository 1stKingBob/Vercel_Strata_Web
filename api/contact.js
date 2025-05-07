import { NextResponse } from 'next/server';

export async function handler(req: Request) {
  if (req.method === 'POST') {
    // Handle POST request (sending data to the server)
    const formData = await req.json();
    const { name, email, unitNumber, category, message, copyToEmail } = formData;

    // Simulate saving the form data or processing it (e.g., sending email)
    console.log("Received form submission:", formData);

    // If you were to process the data, like sending an email, you would do it here.

    // Respond with a success message
    return NextResponse.json({ message: 'Message sent successfully!' });
  }

  if (req.method === 'GET') {
    // Handle GET request (fetching data for the form)
    // In this case, we are sending predefined categories
    const categories = [
      { value: 'general', label: 'General Inquiry' },
      { value: 'maintenance', label: 'Maintenance Request' },
      { value: 'noise', label: 'Noise Complaint' },
      { value: 'bylaws', label: 'By-law Query' },
      { value: 'financial', label: 'Financial Question' },
      { value: 'other', label: 'Other' },
    ];

    // Send the categories as a response
    return NextResponse.json({ categories });
  }

  // Handle unsupported methods
  return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
}
