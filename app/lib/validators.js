import { z } from "zod";


export const projectSchema = z.object({
    name:z.string().min(1,"name is required").max(100,"max 100 character required"),
    key:z.string().min(2,"project key atleast 2 character").max(10,"project key must be 10 character"),
    description:z.max(500,"description must be in 500 characters").optional()
})