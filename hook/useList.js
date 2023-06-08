import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useList() {
  const { data:listCategory } = useQuery(
    ["/category/product/list"],
    () => axios.get("https://reqres.in/api/users?page=2"),
    {
      select: (response) => response.data,

     
    }
  );

  return { listCategory };
}
