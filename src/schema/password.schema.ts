import { object, string, ref } from "yup";

export const updatePasswordSchema = object({
  body: object({
    oldPassword: string().required("Old Password is required"),
    newPassword: string().required("New Password is required"),
    corfirmPassword: string().oneOf(
      [ref("newPassword"), null],
      "Passwords must match"
    ),
  }),
});
