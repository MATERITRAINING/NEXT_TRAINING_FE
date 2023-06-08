"use client";

import React from "react";
import useProductService from "../../service";

const UpdateProduct = ({ params }) => {
  const { id } = params;
  const { useDetailProduct } = useProductService();
  const { data, isFetching } = useDetailProduct(id);

  const initialValues = {
    name: data?.data?.name,
    category: data?.data?.category,
    image: data?.data?.image,
    description: data?.data?.description,
    openDate: data?.data?.openDate,
    cost: data?.data?.cost,
    id:data?.data?.id
  };

  if (isFetching) {
    return <p>Loading</p>;
  }
  //const id = params.id
  return (
    <div>
      {JSON.stringify(initialValues)}
      {JSON.stringify(params)}
      {JSON.stringify(id)}
      <p>oj</p>
    </div>
  );
};

export default UpdateProduct;
