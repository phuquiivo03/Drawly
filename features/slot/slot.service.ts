import { CreateSlot, Slot, SlotExpand, SlotStatus } from "./slot.schema";
import slotRepository from "./slot.repository";
const createSlot = async (slotData: CreateSlot): Promise<Slot | null> => {
  try {
    return await slotRepository.create(slotData);
  } catch (e) {
    throw e;
  }
};

const createManySlots = async (
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

const findManySlots = async (eventId: string) => {
  try {
    const data = await slotRepository.findManyByEvent(eventId);
    return data;
  } catch (e) {
    throw e;
  }
};

const checkAndUpdateSlot = async (
  slotId: string,
  userId: string,
): Promise<Slot | null> => {
  const slot = await slotRepository.findById(slotId);
  if (slot?.user_id) {
    throw new Error("Slot have been taken");
  }
  const result = await slotRepository.updateUserId(slotId, userId);
  return result;
};

const getWinners = async (
  page: number,
  limit: number,
): Promise<SlotExpand[] | null> => {
  const slots = await slotRepository.findManyWinner(page, limit);

  return slots;
};

const slotServices = {
  createSlot,
  createManySlots,
  findManySlots,
  checkAndUpdateSlot,
  getWinners,
};

export default slotServices;
