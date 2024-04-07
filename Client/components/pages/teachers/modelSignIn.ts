import { z } from "zod";

export enum TeacherSignInField {
  EMAIL = "email",
  PASSWORD = "password",
}

export const signInFormSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export const defaultTeacherSignInFormValues = {
  email: "",
  password: "",
};

export type TeacherSignInFormKey = keyof typeof defaultTeacherSignInFormValues;
