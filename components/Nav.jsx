"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FiMenu } from "react-icons/fi";
import { TfiClose } from "react-icons/tfi";
import { Avatar, Box, Flex, VStack } from "@chakra-ui/react";
import useLayoutStore from "@/store/useLayoutStore";
const Nav = () => {
  const router = useRouter();
  const setMenu = useLayoutStore((state) => state.setMenu);
  const menu = useLayoutStore((state) => state.menu);
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  return (
    <nav className="flex-between w-full shadow-sm h-full overflow-hidden  bg-white py-3 px-5">
      {/* {JSON.stringify(session.user.users)} */}
      <section>
        <Link href="/" className="flex gap-2 flex-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-blue-300 bg-clip-text text-transparent">
            BPKP Training
          </h1>
        </Link>
        <button onClick={setMenu} className="text-red-400">
          {menu ? <span>X</span> : <span>Y</span>}
        </button>
      </section>

      <Flex align={"center"} flexDir={"row"} spacing="10">
        <Box>
          {session ? (
            <div className="flex gap-3 md:gap-5">
              <button
                onClick={() => setToggleDropdown(!toggleDropdown)}
                type="button"
              >
                <Avatar name={"IHSAN"} />
              </button>
              {toggleDropdown && (
                <div className="dropdown_dekstop">
                  <button className="mt-5 w-full black_btn" n>
                    {session?.user?.users?.name}
                  </button>
                  <button className="mt-5 w-full black_btn" n>
                    <span className="capitalize">
                      {" "}
                      Login As {session?.user?.users?.role}
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setToggleDropdown(false);
                      signOut();
                    }}
                    className="mt-5 w-full black_btn"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              type="button"
              onClick={() => {
                router.push("/auth/login");
              }}
              className="black_btn"
            >
              Login
            </button>
          )}
        </Box>
        <Box
          display={{
            base: "block",
            lg: "none",
          }}
          marginLeft={2}
        ></Box>
      </Flex>
    </nav>
  );
};

export default Nav;
