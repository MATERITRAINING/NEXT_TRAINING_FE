import { useState } from "react";
import Swal from "sweetalert2";
export default function useConfirmSubmit({ onSubmit, options = {} }) {
  const handleSubmit = (payload) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: true,
    });

    swalWithBootstrapButtons
      .fire({
        title: options?.title ? options.title : "are yout sure?",
        text: options?.title
          ? options.title
          : "You won't be able to revert this",
        icon: options?.warning ? options.warning : "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          await onSubmit(payload);
        }
      });
  };

  return handleSubmit;
}
