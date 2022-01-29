import {object, string} from 'yup';

export const createLoginSchema = object({
    body: object({
        password: string()
            .required("Password is required"),
        identity: string()
            .required("Email or Username is required"),
    }),
});
