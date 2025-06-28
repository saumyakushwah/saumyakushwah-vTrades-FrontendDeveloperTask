import { FC, ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen bg-background text-white">
      {/* Left */}
      <div
        className="hidden md:block relative ml-10 my-10 min-w-[720px] max-w-[720px] rounded-[20px] overflow-hidden"
        style={{
          backgroundImage: `url('/signin-illustration.png')`,
          backgroundSize: "cover",
          backgroundPosition: "bottom",
        }}
      >
        <div className="absolute w-full bottom-0 left-0 p-10">
          <p className="text-[48px] leading-[1.19] font-semibold">
            Welcome to WORKHIVE!
          </p>
          <ul className="mt-6 list-disc list-inside pl-[7px] marker:text-white text-white text-base leading-7">
            <li>
              Employee Management: View detailed profiles, track performance,
              and manage attendance.
            </li>
            <li>
              {" "}
              Performance Insights: Analyze team goals, progress, and
              achievements.
            </li>
            <li>
              {" "}
              Attendance & Leaves: Track attendance patterns and manage leave
              requests effortlessly.
            </li>
          </ul>
        </div>
      </div>

      {/* Right */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-10">
        <div className="w-full max-w-[385px]">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
