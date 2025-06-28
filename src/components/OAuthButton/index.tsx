import Image from "next/image";
import { signIn } from "next-auth/react";

type OAuthButtonProps = {
  provider: "google" | "microsoft";
  enabled?: boolean;
};

const providerData = {
  google: {
    label: "Sign in with Google",
    icon: "/icons/google.svg",
    callbackUrl: "/dashboard",
  },
  microsoft: {
    label: "Sign in with Microsoft",
    icon: "/icons/microsoft.svg",
    callbackUrl: "/dashboard",
  },
};

export default function OAuthButton({ provider, enabled = true }: OAuthButtonProps) {
  const { label, icon, callbackUrl } = providerData[provider];

  return (
    <button
      onClick={() => {
        if (enabled) signIn(provider, { callbackUrl });
      }}
      className={`text-sm w-full bg-[#1D1E26] border border-[#30303d] py-[16px] rounded-[10px] mb-6 flex items-center justify-center gap-[13px] transition-colors duration-200 ${
        enabled
          ? "hover:bg-[#2b2c35] cursor-pointer"
          : "cursor-not-allowed"
      }`}
      disabled={!enabled}
    >
      <Image src={icon} alt={`${provider} logo`} width={20} height={20} />
      <span>{label}</span>
    </button>
  );
}
