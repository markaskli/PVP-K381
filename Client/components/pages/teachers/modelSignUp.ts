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

export const signUpFormSchema = z
  .object({
    name: z.string().min(1, "Šis laukelis yra privalomas"),
    surname: z.string().min(1, "Šis laukelis yra privalomas"),
    password: z.string().min(1, "Šis laukelis yra privalomas"),
    repeatPassword: z.string().min(1, "Šis laukelis yra privalomas"),
    birthDate: z.date().transform((val) => val.toISOString()),
    email: z.string().min(1, "Šis laukelis yra privalomas"),
    phoneNumber: z.string().min(1, "Šis laukelis yra privalomas"),
    school: z.string().min(1, "Šis laukelis yra privalomas"),
    profession: z.string().min(1, "Šis laukelis yra privalomas"),
  })
  .refine((data) => {
    if (data.password !== data.repeatPassword) {
      return false;
    }
    return true;
  });

export const defaultTeacherSignUpFormValues = {
  name: "",
  surname: "",
  password: "",
  repeatPassword: "",
  email: "",
  birthDate: new Date(),
  phoneNumber: "",
  school: "",
  profession: "",
};

export type TeacherSignUpFormKey = keyof typeof defaultTeacherSignUpFormValues;
