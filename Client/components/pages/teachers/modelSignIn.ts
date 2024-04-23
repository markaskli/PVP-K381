import { z } from "zod";

export enum TeacherSignInField {
  EMAIL = "email",
  PASSWORD = "password",
}

export const signInFormSchema = z.object({
  email: z.string().min(1, "Šis laukelis yra privalomas"),
  password: z.string().min(1, "Šis laukelis yra privalomas"),
});

export const defaultTeacherSignInFormValues = {
  email: "",
  password: "",
};

export type TeacherSignInFormKey = keyof typeof defaultTeacherSignInFormValues;
