import { object, string } from "yup";

export const postSchema = object({
  body: object({
    desc: string().required("Description is required"),
    img: string().required("Image is required"),
  }),
});
