import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

// Zod schema for validation
const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  unitNumber: z.string().min(1),
  category: z.string(),
  message: z.string().min(10),
  copyToEmail: z.boolean().optional(),
});

// API route handler
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const data = formSchema.parse(req.body);

      // Log the form submission (you can send it to an email service here)
      console.log("✅ New contact form submission:", data);

      // Respond with success
      res.status(200).json({ success: true });
    } catch (err) {
      // Return error if the validation fails
      console.error("❌ Error in form submission:", err);
      res.status(400).json({ error: "Invalid form submission" });
    }
  } else {
    // Handle method not allowed
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
