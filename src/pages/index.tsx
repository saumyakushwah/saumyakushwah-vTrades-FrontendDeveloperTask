import AuthLayout from "@/components/AuthLayout";
import { isValidEmail } from "@/utils";
import { signIn } from "next-auth/react";
import Image from "next/image";
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
      <div className="w-full max-w-md mx-auto px-4 md:px-0">
        <h1 className="text-4xl font-semibold mb-2">Sign In</h1>
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
          className="w-full mb-6 py-[15px] px-[12px] border border-[#30303d] rounded bg-[#1D1E26] text-white text-sm font-semibold  placeholder-[#85898B] focus:outline-none"
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
            className="w-full py-[15px] px-[12px] border border-[#30303d] rounded bg-[#1D1E26] pr-10 text-white text-sm font-semibold  placeholder-[#85898B] focus:outline-none"
          />
          <button
            type="button"
            className="absolute right-3 top-3 text-gray-400"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <div className="flex justify-between items-center mb-10 text-sm">
          <label className="flex items-center text-xs cursor-pointer">
            <input
              type="checkbox"
              className="mr-2 w-[18px] h-[18px] accent-[#8854C0]"
            />{" "}
            Remember Me
          </label>
          <a
            href="/forgot-password"
            className="hover:underline text-[#8854C0] cursor-pointer"
          >
            Forgot Password?
          </a>
        </div>

        <button
          onClick={handleLogin}
          className="w-full bg-[#8854C0] hover:bg-[#8b5bbe] transition-colors duration-200 text-white py-3 rounded-[10px] mb-10 text-base font-semibold cursor-pointer"
        >
          Sign In
        </button>

        {/* Divider */}
        <div className="flex items-center justify-center mb-8">
          <hr className="flex-grow border-t border-gray-600" />
          <span className="mx-5 text-sm text-gray-400">or</span>
          <hr className="flex-grow border-t border-gray-600" />
        </div>

        {/* OAuth buttons */}
        <button
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          className="w-full bg-[#1D1E26] border border-[#30303d] py-[16px] rounded mb-6 flex items-center justify-center gap-[13px] cursor-pointer hover:bg-[#2b2c35] transition-colors duration-200"
        >
          <Image
            src="/icons/google.svg"
            alt="Google logo"
            width={20}
            height={20}
          />
          <span>Sign in with Google</span>
        </button>
        <button className="w-full bg-[#1D1E26] border border-[#30303d] py-[16px] rounded mb-6 flex items-center justify-center gap-[13px] cursor-not-allowed">
          <Image
            src="/icons/microsoft.svg"
            alt="Microsoft logo"
            width={20}
            height={20}
          />
          <span>Sign in with Microsoft</span>
        </button>

        <p className="text-sm text-center mt-6 text-[#dadada]">
          Don’t have an account?{" "}
          <a
            href="/signup"
            className="text-primary hover:underline ml-2 text-[#8854C0] cursor-pointer"
          >
            Sign up
          </a>
        </p>
      </div>
    </AuthLayout>
  );
}
