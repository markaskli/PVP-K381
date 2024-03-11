import { z } from "zod";

export enum AddChildField {
  NAME = "name",
  CLASS = "class",
}

export const addChildFormSchema = z.object({
  name: z.string(),
  class: z.string(),
});

export const defaultAddChildFormValues = {
  name: "",
  class: "",
};

export type AddChildFormKey = keyof typeof defaultAddChildFormValues;
