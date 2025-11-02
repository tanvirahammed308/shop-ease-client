"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCurrentUser } from "@/features/auth/authTunks";
import { AppDispatch } from "@/redux/store";

export default function AuthInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  // Render children properly
  return <>{children}</>;
}
