import { z } from "zod";

export const EditUserSchema = z.object({
    user_fname: z.string(),
    user_lname: z.string(),
    user_country_code: z.string(),
    user_phone: z.string(),
}).strict().partial();

export type EditUserInput = z.infer< typeof EditUserSchema  >