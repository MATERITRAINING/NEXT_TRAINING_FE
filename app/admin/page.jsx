"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const DashboardAdmin = ({ children }) => {
  const [activeLink, setActiveLink] = useState("");
  const pathname = usePathname();
  useEffect(() => {
    //get current url path
    setActiveLink(pathname);
    //init flowbite
  }, [pathname]);

  console.log("client side render ");
  return (
    <section className="h-full w-full grid grid-col-12">
    
     
      ok
    </section>
  );
};

export default DashboardAdmin;
