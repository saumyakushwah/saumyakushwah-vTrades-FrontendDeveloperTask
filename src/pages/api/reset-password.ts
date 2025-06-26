import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, newPassword } = req.body;

  // Validate input
  if (!email || !newPassword) {
    return res
      .status(400)
      .json({ message: "Email and new password are required." });
  }

  // Simulate password update (In a real-app, update in DB)
  console.log(`Simulated password reset for ${email}`);

  return res.status(200).json({ message: "Password reset successful." });
}
