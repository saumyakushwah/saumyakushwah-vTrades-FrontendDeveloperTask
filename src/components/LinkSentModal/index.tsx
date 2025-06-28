import { useRouter } from "next/router";
import Image from "next/image";

interface LinkSentModalProps {
  email: string;
  onClose: () => void;
}

export default function LinkSentModal({ email, onClose }: LinkSentModalProps) {
  const router = useRouter();

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-[#1D1E26] p-[60px] w-[360px] md:w-[500px] h-[409px] rounded-[10px] text-white flex flex-col items-center justify-center">
        <Image
          src="/icons/mail.svg"
          alt="Success"
          width={100}
          height={100}
        />
        <h2 className="mt-[31px] mb-[12px] text-[20px] leading-[150%] font-semibold text-center">
          Link Sent Successfully!
        </h2>
        <p className="text-sm text-gray-400 text-center mb-[24px] leading-[150%]">
          Check your inbox! We’ve sent you an email with instructions to reset
          your password.
        </p>
        <button
          onClick={() => {
            onClose();
            router.push("/otp-verification?email=" + encodeURIComponent(email));
          }}
          className="ml-auto bg-[#8854C0] w-[116px] h-[50px] rounded-[10px] text-base font-semibold cursor-pointer"
        >
          Okay
        </button>
      </div>
    </div>
  );
}
