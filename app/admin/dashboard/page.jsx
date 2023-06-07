"use client";
import React from "react";
import useAuthStore from "@/store/useAuthStore";

const Dashboard = () => {
  
  const  user =  useAuthStore((state) => state.user)

 
  
  return (
    <section className="h-full w-full overflow-auto p-5">
     
      {JSON.stringify(user)}
    </section>
  );
};

export default Dashboard;
