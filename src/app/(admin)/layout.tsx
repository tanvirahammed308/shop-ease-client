'use client'
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, loading, hydrated } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (hydrated && !loading) {
      if (!user) {
        router.replace("/login");
      } else if (user.role !== "admin") {
        router.replace("/");
      }
    }
  }, [user, loading, hydrated, router]);

  //  Don’t render children until hydration + role check is done

  if (!hydrated || loading || !user || user.role !== "admin") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-t-4 border-gray-300"></div>
      </div>
    );
  }

  //  Only render children when we are sure it's admin
  
  return <>{children}</>;
};

export default AdminLayout;
