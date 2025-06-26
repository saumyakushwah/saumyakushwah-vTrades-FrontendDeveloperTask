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
      <div className="bg-[#1D1E26] p-10 w-[360px] md:w-[500px] h-[409px] rounded-xl text-white flex flex-col items-center justify-center">
        <Image
          src="/icons/mail.svg"
          alt="Success"
          width={64}
          height={64}
          className="mb-6"
        />
        <h2 className="text-xl font-semibold mb-4 text-center">
          Link Sent Successfully!
        </h2>
        <p className="text-sm text-gray-400 text-center mb-10">
          Check your inbox! We’ve sent you an email with instructions to reset
          your password.
        </p>
        <button
          onClick={() => {
            onClose();
            router.push("/otp-verification?email=" + encodeURIComponent(email));
          }}
          className="ml-auto bg-[#8854C0] px-6 py-2 rounded text-sm font-semibold cursor-pointer"
        >
          Okay
        </button>
      </div>
    </div>
  );
}
