import { CreateSlot, Slot, SlotStatus } from "./slot.schema";
import slotRepository from "./slot.repository";
export const createSlot = async (
  slotData: CreateSlot,
): Promise<Slot | null> => {
  try {
    return await slotRepository.create(slotData);
  } catch (e) {
    throw e;
  }
};

export const createManySlots = async (
  slotData: CreateSlot[],
): Promise<Slot[] | null> => {
  try {
    const formatedSlots = slotData.map((slot) => {
      return { ...slot, status: SlotStatus.AVAILABLE };
    });
    return await slotRepository.createMany(formatedSlots);
  } catch (e) {
    throw e;
  }
};
