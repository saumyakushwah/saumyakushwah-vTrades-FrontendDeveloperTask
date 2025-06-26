// Import global styles
import "@/styles/globals.css";

// TypeScript type for app props
import type { AppProps } from "next/app";

// Toast notifications
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// NextAuth provider for session management
import { SessionProvider } from "next-auth/react";

// Root App component
export default function App({ Component, pageProps }: AppProps) {
  return (
    // Provide authentication session to all pages
    <SessionProvider session={pageProps.session}>
      {/* Global toast notification container */}
      <ToastContainer position="top-right" autoClose={3000} />
      {/* Render the active page */}
      <Component {...pageProps} />
    </SessionProvider>
  );
}
