import AuthLayout from "@/components/AuthLayout";
import { useState } from "react";
import { toast } from "react-toastify";
import LinkSentModal from "@/components/LinkSentModal";
import { isValidEmail } from "@/utils";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [showModal, setShowModal] = useState(false);

  // Send OTP and show modal
  const handleSubmit = async () => {
    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }

    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    try {
      const res = await fetch("/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setShowModal(true); // Show modal
      } else {
        toast.error(data.message || "Failed to send reset link.");
      }
    } catch (error) {
      console.error("Error: ", error);
      toast.error("Something went wrong.");
    }
  };

  return (
    <AuthLayout>
      <div className="w-full mx-auto px-4 md:px-0">
        <h1 className="[font-size:32px] font-semibold mb-2">Forgot Your Password?</h1>
        <p className="text-sm text-gray-400 mb-8">
          Don’t worry! Enter your email address, and we’ll send you a link to
          reset it.
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

        <button
          onClick={handleSubmit}
          className="w-full bg-[#8854C0] hover:bg-[#8b5bbe] transition-colors duration-200 text-white h-[50px] rounded-[10px] text-base font-semibold cursor-pointer"
        >
          Submit
        </button>
        {/* Modal */}
        {showModal && (
          <LinkSentModal email={email} onClose={() => setShowModal(false)} />
        )}
      </div>
    </AuthLayout>
  );
}
