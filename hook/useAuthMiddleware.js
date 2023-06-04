import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function useAuthMiddleware() {
 const {status} =  useSession({
    required: true,
    
    onUnauthenticated() {
      redirect("/auth/login");
    },
  });


 

  return {status}
}

