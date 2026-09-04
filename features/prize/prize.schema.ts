import z from "zod";

export const prizeSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  images: z.array(z.string()),
  event_id: z.string(),
  created_at: z.date(),
});

export const createPrizeSchema = z.object({
  name: z.string(),
  description: z.string(),
  images: z.array(z.string()),
  event_id: z.string(),
});

export const createPrizeRequestSchema = z.object({
  name: z.string(),
  description: z.string(),
  images: z.array(z.string()),
});

export type Prize = z.infer<typeof prizeSchema>;
export type CreatePrize = z.infer<typeof createPrizeSchema>;
