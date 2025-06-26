import { OTP_LENGTH } from "@/utils";
import { NextApiRequest, NextApiResponse } from "next";

const SIMULATED_OTP = "123456";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, otp } = req.body;

  // Validate input
  if (!email || !otp) {
    return res.status(400).json({ message: "Email and OTP are required." });
  }

  // Validate OTP length
  if (otp.length !== OTP_LENGTH) {
    return res.status(400).json({ message: "Invalid OTP length." });
  }

  // Simulate OTP verification
  if (otp === SIMULATED_OTP) {
    return res.status(200).json({ message: "OTP verified." });
  }

  return res.status(401).json({ message: "Invalid OTP." });
}
