import AuthLayout from "@/components/AuthLayout";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { MdAccessTime } from "react-icons/md";
import LinkSentModal from "@/components/LinkSentModal";
import { OTP_LENGTH } from "@/utils";

export default function OTPVerification() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  // Extract email from query string
  const email = decodeURIComponent((router.query.email as string) || "");
  // OTP state: array of 6 digits
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  // Timer countdown for resend
  const [timer, setTimer] = useState(30);

  // Countdown logic
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (index: number, value: string) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
    }

    // Move to next input automatically
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) (nextInput as HTMLInputElement).focus();
    }
  };

  // Submit OTP for verification
  const handleSubmit = async () => {
    const enteredOtp = otp.join("");

    // Validate OTP length
    if (enteredOtp.length !== OTP_LENGTH) {
      toast.error(`Please enter the ${OTP_LENGTH}-digit OTP.`);
      return;
    }

    try {
      const res = await fetch("/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: enteredOtp }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("OTP verified!");
        router.push("/new-password?email=" + encodeURIComponent(email));
      } else {
        toast.error(data.message || "Invalid OTP.");
      }
    } catch (error) {
      console.error("Error: ", error);
      toast.error("Something went wrong. Try again.");
    }
  };

  // Resend OTP and show modal
  const handleResendOtp = async () => {
    try {
      const res = await fetch("/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setShowModal(true);
        setTimer(30); // Reset timer
      } else {
        toast.error(data.message || "Failed to resend OTP.");
      }
    } catch (err) {
      console.error("Error: ", err);
      toast.error("Something went wrong.");
    }
  };

  return (
    <AuthLayout>
      <div className="w-full mx-auto px-4 md:px-0">
        <h1 className="[font-size:32px] font-semibold mb-2">Enter OTP</h1>
        <p className="text-sm text-gray-400 mb-[32px]">
          Enter the OTP that we have sent to your email address {email}.
        </p>
        <button
          className="text-[16px] text-[#8854C0] mb-[32px] hover:underline cursor-pointer"
          onClick={() => router.push("/forgot-password")}
        >
          Change Email Address
        </button>

        <div className="flex gap-[4px] md:gap-[22px] justify-between mb-[44px]">
          {otp.map((digit, idx) => (
            <input
              id={`otp-${idx}`}
              key={idx}
              maxLength={1}
              value={digit}
              placeholder="0"
              onChange={(e) => handleChange(idx, e.target.value)}
              className="w-12 h-12 text-center text-white text-[24px] font-medium bg-[#1D1E26] border border-[#30303d] rounded-[10px] focus:outline-none placeholder-[#85898B]"
            />
          ))}
        </div>

        <div className="flex items-center justify-between mb-[44px] text-sm text-gray-400">
          {timer > 0 ? (
            <div className="flex items-center gap-2 text-[14px]">
              <MdAccessTime size={18} />
              <span>{`${timer} sec`}</span>
            </div>
          ) : timer === 0 ? (
            <button
              onClick={handleResendOtp}
              className="text-[14px] text-[#8854C0] hover:underline cursor-pointer"
            >
              Resend OTP
            </button>
          ) : null}
        </div>
        {showModal && (
          <LinkSentModal email={email} onClose={() => setShowModal(false)} />
        )}
        <button
          onClick={handleSubmit}
          className="w-full bg-[#8854C0] hover:bg-[#8b5bbe] transition-colors duration-200 text-white h-[50px] rounded-[10px] text-base font-semibold cursor-pointer"
        >
          Continue
        </button>
      </div>
    </AuthLayout>
  );
}
