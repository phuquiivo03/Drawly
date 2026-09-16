import z from "zod";
import { eventChema } from "../event/event.schema";
import { profileSchema } from "../profile/profile.schema";

export const winnerSchema = z.object({
  id: z.string(),
  event: z.union([z.string(), eventChema]),
  user: z.union([z.string(), profileSchema]),
  created_at: z.date(),
});

export const createWinnerSchema = z.object({
  event: z.union([z.string(), eventChema]),
  user: z.union([z.string(), profileSchema]),
});

export type Winner = z.infer<typeof winnerSchema>;
export type CreateWinner = z.infer<typeof createWinnerSchema>;
