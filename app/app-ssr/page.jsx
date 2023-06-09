import Image from "next/image";
import axios from "@/service/axios";
import useAxiosAuth from "@/hook/useAxiosAuth";

import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { Card2 } from "@/components/Card";
import UserReqres from "@/module/app-ssr/UserReqres";

async function getUser(id) {
  const res = await axios(`https://reqres.in/api/users?page=${id}`);

  return res.data.data;
}
async function AppSSR() {
  const session = await getServerSession(authOptions);

  const dataKelas = await getUser(1);

  console.log("data kelas", dataKelas);

  console.log("di server");

  return (
    <>
      {dataKelas &&
        dataKelas?.map((item, key) => (
          <section key={key}>
            <UserReqres
              key={key}
              avatar={item.avatar}
              first_name={item.first_name}
              id={item.id}
            />{" "}
          </section>
        ))}
    </>
  );
}

export default AppSSR;
