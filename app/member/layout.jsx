'use client'

import React, { useEffect, useState } from 'react'
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

import Link from 'next/link';
import {usePathname } from 'next/navigation';

const MemberLayout = ({ children }) => {

  const [activeLink, setActiveLink] = useState('');
  const pathname = usePathname();
  useEffect(() => {
    //get current url path
    setActiveLink(pathname);
      //init flowbite
   
  }, [pathname]);

  
  return (
    <div>
    {children}
   </div>
  )
};

export default MemberLayout;
