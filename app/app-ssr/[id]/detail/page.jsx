import Image from "next/image";
import axios from "@/service/axios";

import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import UserReqres from "@/module/app-ssr/UserReqres";

async function getDetailUser(id) {
  const res = await axios.get(`https://reqres.in/api/users/${id}`);

  return res.data.data;
}

async function Detail({ params }) {
  const session = await getServerSession(authOptions);
  const user = await getDetailUser(params.id);

  console.log("app-ssr detail render di server");

  return (
   
      <UserReqres
       
      
        first_name={user.first_name}
      />
    
  
  );
}


export default Detail