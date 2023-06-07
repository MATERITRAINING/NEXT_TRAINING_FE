import useAuthStore from "@/store/useAuthStore";
import { useEffect, useState } from "react";
export default function useProtected(accessMenu, permission) {
  const user = useAuthStore((state) => state.user);
  const [access, setAccess] = useState(false);
  useEffect(() => {
    if (user) {
      user?.permissions?.access.map((item) => {
        if (item.accessName.toLowerCase() === accessMenu.toLowerCase()) {
          if (item.permission?.[`${permission}`] === 1) {
            return setAccess(true);
          }
        }
      });
    }
  }, [user, accessMenu, permission]);

  return { access };
}
