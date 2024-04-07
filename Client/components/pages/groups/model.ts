import { z } from "zod";

export enum GroupField {
  NAME = "name",
}

export const groupFormSchema = z.object({
  name: z.string().nonempty(),
});

export const defaultGroupFormValues = {
  name: "",
};

export type GroupFormKey = keyof typeof defaultGroupFormValues;
