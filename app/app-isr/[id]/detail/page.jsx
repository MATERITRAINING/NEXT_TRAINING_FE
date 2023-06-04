import React from "react";
import UserReqres from "@/module/app-ssr/UserReqres";

export async function generateMetadata({params}) {
  const user = await getDetailUser(params.id);
  if (!user) {
    return {
      title: "Not Found",
      description: "user not found",
    };
  }

  return {
    title: user.data.first_name,
    description: user.data.first_name,
  };
}

export async function generateStaticParams() {
  const users = await fetch(`https://reqres.in/api/users?page=1`).then((res) =>
    res.json()
  );

  return users?.data?.map((user) => {
    return {
      id: user.id.toString(),
    };
  });
}

async function getDetailUser(id) {
  const res = await fetch(`https://reqres.in/api/users/${id}`, {
    next: { revalidate: 10 },
  });

  return res.json();
}

const Page = async ({ params }) => {
  const user = await getDetailUser(params.id);

  console.log("userid", user);
  return (
    <div>
      <UserReqres avatar={user.data.avatar} first_name={user.data.first_name} />
    </div>
  );
};

export default Page;
