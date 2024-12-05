import { z } from "zod";

export const projectSchema = z.object({
  name: z
    .string()
    .min(1, "name is required")
    .max(100, "max 100 character required"),
  key: z
    .string()
    .min(2, "project key atleast 2 character")
    .max(10, "project key must be 10 character"),
  description: z
    .string()
    .max(500, "description must be in 500 characters")
    .optional(),
});

export const sprintSchema = z.object({
    name:z.string().min(1,"sprint name required!"),
    startDate:z.date(),
    endDate:z.date()
})

