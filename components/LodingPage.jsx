"use client";
import React from "react";
import usePermission from "@/hook/usePermission";
import { useSession } from "next-auth/react";

function LodingPage({ children }) {
  const { status } = useSession();

  usePermission();
  if (status === "loading") {
    return <div>loading</div>;
  }
  return <>{children}</>;
}

export default LodingPage;
