"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

// Define the higher-order component (HOC)
const withAuth = (Component: React.ComponentType) => {
  const AuthHOC = (props) => {
    const router = useRouter();

    useEffect(() => {
      // Get the token from cookies
      const token = Cookies.get("token");

      // If no token exists, redirect to the sign-in page
      if (!token) {
        router.push("/auth/sign-in");
      }
    }, [router]);

    // If the token exists, render the component
    return <Component {...props} />;
  };

  // Optional: Set display name for debugging
  AuthHOC.displayName = `withAuth(${Component.displayName || Component.name})`;

  return AuthHOC;
};

export default withAuth;
