import { useRouter } from "next/router";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import AuthLayout from "@/components/AuthLayout";
import Link from "next/link";
import { isValidEmail } from "@/utils";
import OAuthButton from "@/components/OAuthButton";

export default function SignUp() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSignUp = async () => {
    if (!email || !password || !confirmPassword) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, confirmPassword }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("fallbackName", email.split("@")[0]);
        toast.success(data.message || "Account created! Redirecting...");
        setTimeout(() => {
          router.push("/dashboard");
        }, 1000);
      } else {
        toast.error(data.message || "Signup failed.");
      }
    } catch (err) {
      console.error("Signup error:", err);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <AuthLayout>
      <div className="w-full mx-auto px-4 md:px-0">
        <h1 className="[font-size:32px] font-semibold mb-2">Sign Up</h1>
        <p className="text-sm text-gray-400 mb-8">
          Join us and manage your workspace easily.
        </p>

        <label className="block mb-2 text-xs font-medium text-white">
          Email Address
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="navinash@workhive.com"
          className="w-full mb-6 h-[50px] px-[12px] border border-[#30303d] rounded-[10px] bg-[#1D1E26] text-white text-sm font-semibold  placeholder-[#85898B] focus:outline-none"
        />

        <label className="block mb-2 text-xs font-medium text-white">
          Password
        </label>
        <div className="relative mb-6">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
            className="w-full h-[50px] px-[12px] border border-[#30303d] rounded-[10px] bg-[#1D1E26] pr-10 text-white text-sm font-semibold  placeholder-[#85898B] focus:outline-none"
          />
          <button
            type="button"
            className="absolute right-4 top-[17px] text-gray-400"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <label className="block mb-2 text-xs font-medium text-white">
          Re-enter your new password
        </label>
        <div className="relative mb-10">
          <input
            type={showConfirm ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="********"
            className="w-full h-[50px] px-[12px] border border-[#30303d] rounded-[10px] bg-[#1D1E26] pr-10 text-white text-sm font-semibold  placeholder-[#85898B] focus:outline-none"
          />
          <button
            type="button"
            className="absolute right-4 top-[17px] text-gray-400"
            onClick={() => setShowConfirm(!showConfirm)}
          >
            {showConfirm ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <button
          onClick={handleSignUp}
          className="w-full bg-[#8854C0] hover:bg-[#8b5bbe] transition-colors duration-200 text-white h-[50px] rounded-[10px] mb-[43px] text-base font-semibold cursor-pointer"
        >
          Sign Up
        </button>

        <div className="flex items-center justify-center mb-8">
          <hr className="flex-grow border-t border-[#272727]" />
          <span className="mx-3 text-sm text-white">or</span>
          <hr className="flex-grow border-t border-[#272727]" />
        </div>
        
        {/* OAuth buttons */}
        <OAuthButton provider="google" />
        <OAuthButton provider="microsoft" enabled={false} />

        <p className="text-xs text-center mt-6 text-[#dadada]">
          Already have an account?
          <Link
            href="/"
            className="font-semibold text-primary hover:underline ml-2 text-[#8854C0] cursor-pointer"
          >
            Sign in
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
