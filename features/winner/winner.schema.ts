import z from "zod";
import { eventChema } from "../event/event.schema";
import { profileSchema } from "../profile/profile.schema";
import { prizeSchema } from "../prize/prize.schema";

export const winnerSchema = z.object({
  id: z.string(),
  event: z.union([z.string(), eventChema]),
  user: z.union([z.string(), profileSchema]),
  prize: z.union([z.string(), prizeSchema]),
  created_at: z.date(),
});

export const createWinnerSchema = z.object({
  event: z.union([z.string(), eventChema]),
  user: z.union([z.string(), profileSchema]),
  prize: z.union([z.string(), prizeSchema]),
});

export type Winner = z.infer<typeof winnerSchema>;
export type CreateWinner = z.infer<typeof createWinnerSchema>;
