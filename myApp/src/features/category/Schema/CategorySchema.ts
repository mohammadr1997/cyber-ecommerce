import { z } from "zod";
export const CategorySchema = z.object({
  name: z.string().min(3, "name at least 3 chracters"),
  icon: z.string().min(1, "icon is required"),
});

export type formDataType = z.infer<typeof CategorySchema>;
