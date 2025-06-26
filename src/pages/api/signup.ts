import { isValidEmail } from "@/utils";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, password, confirmPassword } = req.body;

  // Required fields
  if (!email || !password || !confirmPassword) {
    return res
      .status(400)
      .json({ message: "Email, password and confirm password are required." });
  }

  // Email format check
  if (!isValidEmail(email)) {
    return res.status(400).json({ message: "Invalid email format." });
  }

  // Length check
  if (email.length > 100 || password.length > 100) {
    return res.status(400).json({ message: "Email or password is too long." });
  }

  // Password match check
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match." });
  }

  // Simulated check for existing user
  if (email === "saumyakushwahsk@gmail.com") {
    return res.status(409).json({ message: "User already exists." });
  }

  // Simulated account creation
  return res.status(201).json({ message: "Account created successfully!" });
}
