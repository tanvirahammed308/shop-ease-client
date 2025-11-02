"use client";

import { fetchCurrentUser } from "@/features/auth/authTunks";
import { RootState, AppDispatch } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        await dispatch(fetchCurrentUser()).unwrap();
      } catch (err) {
        console.log(err)
        
        router.replace("/login");
      } finally {
        setCheckingAuth(false);
      }
    };

    checkUser();
  }, [dispatch, router]);

  if (checkingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-t-4 border-gray-300"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; 
  }

  return <>{children}</>;
};

export default ProtectedLayout;
