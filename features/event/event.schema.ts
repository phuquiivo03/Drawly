import z from "zod";
import { createPrizeRequestSchema } from "../prize/prize.schema";
export enum EventStatus {
  OPEN = "open",
  FULL = "full",
  LOCKED = "locked",
  DRAWING = "drawing",
  CLOSE = "close",
}

export const eventChema = z.object({
  id: z.string(),
  status: z.enum(EventStatus),
  server_seed: z.string(),
  server_seed_hash: z.string(),
  creator_id: z.string(),
  created_at: z.date(),
});

export const createEventSchema = z.object({
  server_seed: z.string(),
  server_seed_hash: z.string(),
  creator_id: z.string(),
});

export const createEventRequestSchema = z.object({
  max_slot: z.string().optional(),
  creator_id: z.string(),
  prizes: z.array(createPrizeRequestSchema),
});

export type Event = z.infer<typeof eventChema>;
export type CreateEvent = z.infer<typeof createEventSchema>;
