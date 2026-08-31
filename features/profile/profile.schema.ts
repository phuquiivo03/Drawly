import z from "zod";

export const profileSchema = z.object({
  id: z.string(),
  display_name: z.string(),
  email: z.string().optional(),
  avatar_url: z.string(),
  created_at: z.date(),
});

export type Profile = z.infer<typeof profileSchema>;
