import { useRouter } from "next/router";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import Image from "next/image";
import AuthLayout from "@/components/AuthLayout";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { isValidEmail } from "@/utils";

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
      <h1 className="text-4xl font-semibold mb-2">Sign Up</h1>
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
        className="w-full mb-6 py-[15px] px-[12px] border border-[#30303d] rounded bg-[#1D1E26] text-white text-sm font-semibold  placeholder-[#85898B] focus:outline-none"
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

      <label className="block mb-2 text-xs font-medium text-white">
        Re-enter your new password
      </label>
      <div className="relative mb-10">
        <input
          type={showConfirm ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="********"
          className="w-full py-[15px] px-[12px] border border-[#30303d] rounded bg-[#1D1E26] pr-10 text-white text-sm font-semibold  placeholder-[#85898B] focus:outline-none"
        />
        <button
          type="button"
          className="absolute right-3 top-3 text-gray-400"
          onClick={() => setShowConfirm(!showConfirm)}
        >
          {showConfirm ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>

      <button
        onClick={handleSignUp}
        className="w-full bg-[#8854C0] hover:bg-[#8b5bbe] transition-colors duration-200 text-white py-3 rounded-[10px] mb-10 text-base font-semibold cursor-pointer"
      >
        Sign Up
      </button>

      <div className="flex items-center justify-center mb-8">
        <hr className="flex-grow border-t border-gray-600" />
        <span className="mx-5 text-sm text-gray-400">or</span>
        <hr className="flex-grow border-t border-gray-600" />
      </div>

      <button
        onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
        className="w-full bg-[#1D1E26] border border-[#30303d] py-[16px] rounded mb-6 flex items-center justify-center gap-[13px] cursor-pointer hover:bg-[#2b2c35] transition-colors duration-200"
      >
        <Image src="/icons/google.svg" alt="Google" width={20} height={20} />
        <span>Sign in with Google</span>
      </button>
      <button className="w-full bg-[#1D1E26] border border-[#30303d] py-[16px] rounded mb-6 flex items-center justify-center gap-[13px] cursor-not-allowed">
        <Image
          src="/icons/microsoft.svg"
          alt="Microsoft"
          width={20}
          height={20}
        />
        <span>Sign in with Microsoft</span>
      </button>

      <p className="text-sm text-center mt-6 text-[#dadada]">
        Already have an account?
        <Link
          href="/"
          className="text-[#8854C0] hover:underline ml-2 cursor-pointer"
        >
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}
