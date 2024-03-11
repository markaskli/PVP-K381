import { z } from "zod";

export enum TeacherSignUpField {
  NAME = "name",
  SURNAME = "surname",
  PASSWORD = "password",
  REPEAT_PASSWORD = "repeatPassword",
  BIRTH_DATE = "birthDate",
  EMAIL = "email",
  PHONE_NUMBER = "phoneNumber",
  SCHOOL = "school",
  PROFESSION = "profession",
}

export const signUpFormSchema = z.object({
  name: z.string(),
  surname: z.string(),
  password: z.string(),
  repeatPassword: z.string(),
  birthDate: z.date().transform((val) => val.toISOString()),
  email: z.string(),
  phoneNumber: z.string(),
  school: z.string(),
  profession: z.string(),
});

export const defaultTeacherSignUpFormValues = {
  name: "",
  surname: "",
  password: "",
  repeatPassword: "",
  email: "",
  birthDate: new Date(),
  phoneNumber: [],
  school: "",
  profession: "",
};

export type TeacherSignUpFormKey = keyof typeof defaultTeacherSignUpFormValues;
