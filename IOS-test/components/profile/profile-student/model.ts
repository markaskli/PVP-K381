import { z } from "zod";

export enum ProfileField {
  NAME = "name",
  CAPTURED_POINTS = "capturedPoints",
  GROUPS = "groups",
  PARENTS = "parents",
  CREATED_AT = "createAt",
}

export const profileFormSchema = z.object({
  name: z.string(),
  capturedPoints: z.number(),
  groups: z.array(z.string()),
  parents: z.array(z.string()),
  createAt: z.date().transform((val) => val.toISOString()),
});

export const defaultProfileFormValues = {
  name: "",
  capturedPoints: 0,
  groups: [],
  parents: [],
  createAt: "",
};

export type StudentFormKey = keyof typeof defaultProfileFormValues;
