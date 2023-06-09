"use client";
import { Heading } from "@chakra-ui/react";
import React, { useState } from "react";
import { useEffect } from "react";

function Page() {
    
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <Heading colorScheme="red">
        Anda tidak memiliki Akses ke halaman ini
        <button onCli>Klik</button>
      </Heading>
    </div>
  );
}

export default Page;
