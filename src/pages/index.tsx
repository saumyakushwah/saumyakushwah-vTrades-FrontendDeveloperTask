import AuthLayout from "@/components/AuthLayout";
import OAuthButton from "@/components/OAuthButton";
import { isValidEmail } from "@/utils";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Handles login form submission
  const handleLogin = async () => {
    // Basic input validation
    if (!email || !password) {
      toast.error("Please enter both email and password.");
      return;
    }

    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    try {
      // API call to mock login endpoint
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // Store a fallback name for dashboard use
        localStorage.setItem("fallbackName", email.split("@")[0]);
        toast.success(data.message || "Login successful!");
        setTimeout(() => {
          router.push("/dashboard");
        }, 1000); // short delay to let toast show
      } else {
        toast.error(data.message || "Invalid credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <AuthLayout>
      <div className="w-full mx-auto px-4 md:px-0">
        <h1 className="[font-size:32px] font-semibold mb-2">Sign In</h1>
        <p className="text-sm text-gray-400 mb-8">
          Manage your workspace seamlessly. Sign in to continue.
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
        <div className="relative mb-3">
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

        <div className="flex justify-between items-center mb-10 text-sm">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="mr-2 w-[18px] h-[18px] accent-[#8854C0]"
            />{" "}
            <p className="text-xs">Remember Me</p>
          </label>
          <Link
            href="/forgot-password"
            className="text-xs font-semibold hover:underline text-[#8854C0] cursor-pointer"
          >
            Forgot Password?
          </Link>
        </div>

        <button
          onClick={handleLogin}
          className="w-full bg-[#8854C0] hover:bg-[#8b5bbe] transition-colors duration-200 text-white h-[50px] rounded-[10px] mb-[43px] text-base font-semibold cursor-pointer"
        >
          Sign In
        </button>

        {/* Divider */}
        <div className="flex items-center justify-center mb-8">
          <hr className="flex-grow border-t border-[#272727]" />
          <span className="mx-3 text-sm text-white">or</span>
          <hr className="flex-grow border-t border-[#272727]" />
        </div>

        {/* OAuth buttons */}
        <OAuthButton provider="google" />
        <OAuthButton provider="microsoft" enabled={false} />

        <p className="text-xs text-center mt-6 text-[#dadada]">
          Don’t have an account?{" "}
          <Link
            href="/signup"
            className="font-semibold text-primary hover:underline ml-2 text-[#8854C0] cursor-pointer"
          >
            Sign up
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
