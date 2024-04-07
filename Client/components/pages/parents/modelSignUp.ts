import { z } from "zod";

export enum ParentSignUpField {
  NAME = "name",
  SURNAME = "surname",
  PASSWORD = "password",
  REPEAT_PASSWORD = "repeatPassword",
  BIRTH_DATE = "birthDate",
  EMAIL = "email",
  PHONE_NUMBER = "phoneNumber",
}

export const signUpFormSchema = z.object({
  name: z.string(),
  surname: z.string(),
  password: z.string(),
  repeatPassword: z.string(),
  birthDate: z.date().transform((val) => val.toISOString()),
  email: z.string(),
  phoneNumber: z.string(),
});

export const defaultParentSignUpFormValues = {
  name: "",
  surname: "",
  password: "",
  repeatPassword: "",
  email: "",
  birthDate: new Date(),
  phoneNumber: [],
};

export type ParentSignUpFormKey = keyof typeof defaultParentSignUpFormValues;
