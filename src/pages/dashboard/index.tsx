import { GetServerSideProps } from "next";
import { useSession, signOut, getSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const { data: session } = useSession(); // Get current session data from NextAuth
  const [fallbackName, setFallbackName] = useState("");

  useEffect(() => {
    // If session doesn't include a user name
    // retrieve the fallback name from localStorage
    if (!session?.user?.name) {
      const nameFromStorage = localStorage.getItem("fallbackName");
      if (nameFromStorage) setFallbackName(nameFromStorage);
    }
  }, [session]);

  return (
    <div className="h-screen flex items-center justify-center flex-col text-white bg-background font-sans">
      <h1 className="text-2xl mb-4">
        Welcome {session?.user?.name || fallbackName || "User"}!
      </h1>
      <button
        onClick={() => {
          localStorage.removeItem("fallbackName");
          signOut({ callbackUrl: "/" });
        }}
        className="bg-[#1D1E26] border border-[#30303d] py-2 rounded primary px-4 cursor-pointer"
      >
        Sign Out
      </button>
    </div>
  );
}

// Server-side protection for authenticated access
export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  // If no session, redirect to sign-in page
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  // If session exists, allow access
  return {
    props: { session },
  };
};
