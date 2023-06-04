"use client";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import useAxiosAuth from "@/hook/useAxiosAuth";
import { useInfiniteQuery } from "@tanstack/react-query";

function Berita() {
  const axiosAuth = useAxiosAuth();
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["projects"],
    queryFn: ({ pageParam = 1 }) => {
      let params = {
        page: pageParam,
        pageSize: 5,
      };

      return axiosAuth.get("/product/list", {
        params,
      });
    },

    getNextPageParam: (lastPage) => {
      console.log("data", lastPage?.data);

      let { page, total, pageSize } = lastPage?.data?.pagination;

      let totalPage = Math.ceil(total / pageSize);

      return page < totalPage ? page + 1 : undefined;
      //   return lastPage?.data?.pagination?.page <
      //     lastPage?.data?.pagination?.total // Here I'm assuming you have access to the total number of pages
      //     ? lastPage?.data?.pagination?.page + 1
      //     : undefined; // If
    },
  });

  console.log("data", data);
  return (
    <>
      <div
        id="scrollableDiv"
        className=" px-10"
        style={{
          height: "100%",
          width: "100%",
          overflow: "auto",
          display: "flex",
          // flexDirection: "column-reverse",
        }}
      >
        <InfiniteScroll
          dataLength={
            data?.pages?.length === undefined ? 0 : data?.pages.length * 5
          } //This is important field to render the next data
          next={() => fetchNextPage()}
          style={{ display: "flex", flexDirection: "column-reverse" }} //To put endMessage and loader to the top.
          hasMore={hasNextPage}
          loader={<h4>Loading...</h4>}
          scrollableTarget="scrollableDiv"
        >
          {data &&
            data.pages.map((group, i) => (
              <section className="space-y-10 w-full " key={i}>
                {group.data.data.map((project) => (
                  <div className="w-full h-32  bg-blue-200" key={project.id}>
                    <p>{project.name}</p>
                  </div>
                ))}
              </section>
            ))}
        </InfiniteScroll>
      </div>
    </>
  );
}

export default Berita;
