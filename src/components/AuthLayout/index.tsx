import Image from "next/image";
import { FC, ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen bg-background text-white font-sans">
      {/* Left */}
      <div className="hidden md:flex w-full md:w-1/2 bg-background items-center justify-center px-10 py-10">
        <Image
          src="/signin-illustration.png"
          alt="Auth illustration"
          width={720}
          height={944}
          className="object-contain max-h-full"
        />
      </div>

      {/* Right */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-10">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}

export default AuthLayout;
