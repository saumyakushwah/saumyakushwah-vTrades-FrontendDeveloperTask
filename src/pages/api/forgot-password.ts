import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required." });
  }

  // Simulate sending OTP to email (in a real app, send email here)
  console.log(`Simulated sending OTP to ${email}`);

  return res.status(200).json({ message: "OTP sent successfully." });
}
