import { z } from "zod";

export const AddUserSchema = z.object({
    user_public_id:z.string(),
    user_fname: z.string(),
    user_lname: z.string(),
    user_country_code: z.string(),
    user_phone: z.string()
}).strict();

export type AddUserInput = z.infer< typeof AddUserSchema >