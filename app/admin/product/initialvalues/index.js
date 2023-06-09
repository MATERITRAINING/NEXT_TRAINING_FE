import * as Yup from "yup";

export const productValidation = {
  name: Yup.string().nullable().required("Wajib"),
  cost: Yup.number().required("Wajib"),
  description: Yup.string().required("Wajib"),
  category: Yup.string().required("Wajib Pilih"),
  openDate: Yup.string().required("Wajib Pilih"),
};

export const productInitialValue = {
  name: "",
  description: "",
  openDate: "",
  cost: "",
  category: "",
};

  
