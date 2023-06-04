import useAxiosAuth from "../hook/useAxiosAuth";

export async function getKelas(params) {
  console.log("jalan");
  return client.get("/kelas/list", {
    params
  });
}

export async function createKelas(payload) {
  return client.post("/kelas/create", payload);
}

export async function getDetailKelas(id) {
  return client.get(`/kelas/detail/${id}`);
}
export async function updatelKelas(payload) {
  return client.put(`/kelas/update/${payload.id}`, payload);
}


export async function createKelasBulk(payload){
    return client.post('/kelas/create-bulk', payload)
}


