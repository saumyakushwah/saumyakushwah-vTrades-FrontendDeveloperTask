import { GetServerSideProps } from "next";
import { useSession, signOut, getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import jwt, { JwtPayload } from "jsonwebtoken";

type SessionUser = {
  name: string;
  email: string;
};

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
export const getServerSideProps: GetServerSideProps<{
  session: { user: SessionUser };
}> = async (context) => {
  // Check NextAuth session (Google OAuth)
  const session = await getSession(context);
  if (session) {
    return {
      props: { session: { user: session.user as SessionUser } },
    };
  }

  // Check Mock Signup session
  const token = context.req.cookies["next-auth.session-token"];
  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET!
    ) as JwtPayload;

    if (decoded && decoded.email && decoded.name) {
      return {
        props: {
          session: {
            user: {
              name: decoded.name,
              email: decoded.email,
            },
          },
        },
      };
    }
  } catch (error) {
    // Token is invalid or expired
    console.warn("Invalid token in getServerSideProps:", error);
    return {
      redirect: {
        destination: "/?error=token_invalid",
        permanent: false,
      },
    };
  }

  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };
};
