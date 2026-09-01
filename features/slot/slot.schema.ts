import z from "zod";
export enum SlotStatus {
  AVAILABLE = "available",
}
export const slotSchema = z.object({
  id: z.string(),
  event_id: z.string(),
  slot_number: z.string(),
  user_id: z.string().optional(),
  status: z.enum(SlotStatus),
});

export const shortSlotSchema = z.object({
  id: z.string(),
  slot_number: z.string(),
  user_id: z.string().optional(),
});

export const createSlotSchema = z.object({
  event_id: z.string(),
  slot_number: z.number(),
  user_id: z.string().optional,
});

export type Slot = z.infer<typeof slotSchema>;
export type ShortSlot = z.infer<typeof shortSlotSchema>;
export type CreateSlot = z.infer<typeof createSlotSchema>;
