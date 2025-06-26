import { isValidEmail } from "@/utils";
import { NextApiRequest, NextApiResponse } from "next";
import { sign } from "jsonwebtoken";
import { serialize } from "cookie";

const JWT_SECRET = process.env.NEXTAUTH_SECRET!;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, password } = req.body;

  // Validation checks
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ message: "Invalid email format." });
  }

  if (email.length > 100 || password.length > 100) {
    return res.status(400).json({ message: "Email or password is too long." });
  }

  // Simulated login check
  // if (email === "saumyakushwahsk@gmail.com" && password === "test123") {
  //   return res.status(200).json({ message: "Login successful" });
  // }

  if (email === "saumyakushwahsk@gmail.com" && password === "test123") {
    // Generate JWT token
    const token = sign(
      {
        name: "Saumya Kushwah",
        email,
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Set cookie for next-auth session token
    res.setHeader(
      "Set-Cookie",
      serialize("next-auth.session-token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60,
      })
    );

    return res.status(200).json({ message: "Login successful" });
  }

  return res.status(401).json({ message: "Invalid email or password" });
}
