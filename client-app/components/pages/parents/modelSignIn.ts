import { z } from "zod";

export enum ParentSignInField {
  EMAIL = "email",
  PASSWORD = "password",
}

export const signInFormSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export const defaultParentSignInFormValues = {
  email: "",
  password: "",
};

export type ParentSignInFormKey = keyof typeof defaultParentSignInFormValues;
