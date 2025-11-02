"use client";
import { Toaster } from "react-hot-toast";
import { usePathname } from "next/navigation";

export default function ClientToasterWrapper() {
  const pathname = usePathname();

  
  return <Toaster key={pathname} position="top-center" reverseOrder={false} />;
}
