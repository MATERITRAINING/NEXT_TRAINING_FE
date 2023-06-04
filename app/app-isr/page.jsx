import axios from "@/service/axios";
import UserReqres from "@/module/app-ssr/UserReqres";
async function getKelas() {
  const res = await fetch(`https://reqres.in/api/users?page=1`, {
    next: { revalidate: 10 },
  });

  console.log("res", res);

  return res.json();
}

export default async function StaticPage() {
  const dataKelas = await getKelas();
  console.log("render di browser", dataKelas);
  return (
    <>
      {dataKelas &&
        dataKelas?.data?.map((item, key) => (
          <section key={key}>
            <UserReqres
              avatar={item.avatar}
              first_name={item.first_name}
              id={item.id}
            />
          </section>
        ))}
    </>
  );
}
