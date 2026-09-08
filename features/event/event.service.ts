import { CreateEvent, EventStatus } from "./event.schema";
import eventRepository from "./event.repository";
import { ShortSlot } from "../slot/slot.schema";
import slotRepository from "../slot/slot.repository";
import { createParticipantsPayload } from "@/lib/helper";
import { getWinnerIndex, hash } from "@/lib/crypto.helper";
import prizeService from "../prize/prize.service";
export const createEvent = async (eventData: CreateEvent) => {
  try {
    return await eventRepository.create(eventData);
  } catch (e) {
    throw e;
  }
};

const findById = async (id: string) => {
  const event = await eventRepository.findById(id);
  if (!event) throw new Error("Fail to find event");
  const eventPrizes = await prizeService.findByEventId(id);
  return { ...event, prizes: eventPrizes };
};

const getEventWiner = async (eventId: string): Promise<ShortSlot> => {
  // hash (seed + eventId + (participants -> normalize -> hash)) % length
  const event = await eventRepository.findById(eventId);
  if (!event) throw new Error("Event not found!");
  if (event.status == EventStatus.CLOSE) throw new Error("Event had closed");
  if (event.status != EventStatus.LOCKED)
    throw new Error("Event need to be LOCK");
  const participants = await slotRepository.findManyByEvent(eventId);
  if (!participants || participants.length == 0)
    throw new Error("No participant found");
  const participantsPayload = createParticipantsPayload(participants);
  const participantsHash = hash(participantsPayload);
  const winnerIndex = getWinnerIndex(
    event.server_seed,
    eventId,
    participantsHash,
    participants.length,
  );
  const winner = participants[winnerIndex];
  // update event status
  await eventRepository.updateStatus(event, EventStatus.CLOSE);
  return winner;
};
const eventServices = {
  createEvent,
  findById,
  getEventWiner,
};
export default eventServices;
