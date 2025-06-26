import AuthLayout from "@/components/AuthLayout";
import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Image from "next/image";

export default function NewPassword() {
  const router = useRouter();
  // Get email from query params
  const email = decodeURIComponent((router.query.email as string) || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(false); // Password mismatch error

  // Handle password update
  const handleSubmit = async () => {
    // Validate fields
    if (!password || !confirmPassword) {
      toast.error("Please fill in both fields.");
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setError(true);
      return;
    }

    setError(false);

    try {
      const res = await fetch("/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword: password }),
      });

      const data = await res.json();

      if (res.ok) {
        setShowModal(true);
      } else {
        toast.error(data.message || "Failed to update password.");
      }
    } catch (error) {
      console.error("Error: ", error);
      toast.error("Something went wrong.");
    }
  };

  return (
    <AuthLayout>
      <h1 className="text-2xl font-semibold mb-2">Create New Password</h1>
      <p className="text-sm text-gray-400 mb-8">
        Choose a strong and secure password to keep your account safe. Make sure
        it’s easy for you to remember, but hard for others to guess!
      </p>

      <label className="block mb-2 text-xs font-medium text-white">
        Password
      </label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full mb-6 py-[15px] px-[12px] border border-[#30303d] rounded bg-[#1D1E26] text-white text-sm font-semibold placeholder-gray-500 focus:outline-none"
      />

      <div className="mb-11">
        <label className="block mb-2 text-xs font-medium text-white">
          Re-enter your password
        </label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className={`w-full mb-2 py-[15px] px-[12px] border ${
            error ? "border-red-500" : "border-[#30303d]"
          } rounded bg-[#1D1E26] text-white text-sm font-semibold placeholder-gray-500 focus:outline-none`}
        />
        {/* Password mismatch error */}
        {error && (
          <p className="text-sm text-red-500 flex items-center gap-1 mb-6">
            <Image src="/icons/error.svg" alt="Error" width={16} height={16} />
            Oops! Passwords Don’t Match
          </p>
        )}
      </div>

      <button
        onClick={handleSubmit}
        className="w-full bg-[#8854C0] hover:bg-[#8b5bbe] transition-colors duration-200 text-white py-3 rounded-[10px] text-base font-semibold cursor-pointer"
      >
        Update Password
      </button>

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#1D1E26] p-10 w-[360px] md:w-[500px] h-[409px] rounded-xl text-white flex flex-col items-center justify-center">
            <Image
              src="/icons/check.svg"
              alt="Success"
              width={64}
              height={64}
              className="mb-6"
            />
            <h2 className="text-xl font-semibold mb-4 text-center">
              Password Created!
            </h2>
            <p className="text-sm text-gray-400 text-center mb-10">
              Your password has been successfully updated. You can now use your
              new password to log in.
            </p>
            <button
              onClick={() => router.push("/")}
              className="ml-auto bg-[#8854C0] px-6 py-2 rounded text-sm font-semibold cursor-pointer"
            >
              Okay
            </button>
          </div>
        </div>
      )}
    </AuthLayout>
  );
}
