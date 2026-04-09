import { z } from "zod";

export const AddGUserSchema = z.object({
    user_public_id:z.string(),
    user_fname: z.string(),
    user_lname: z.string(),
}).strict();

export type AddGUserInput = z.infer< typeof AddGUserSchema >