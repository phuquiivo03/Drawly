import { CreateEvent, Event, EventStatus, EventWinner } from "./event.schema";
import eventRepository from "./event.repository";
import { ShortSlot, SlotExpand } from "../slot/slot.schema";
import slotRepository from "../slot/slot.repository";
import { createParticipantsPayload } from "@/lib/helper";
import { getWinnerIndex, hash } from "@/lib/crypto.helper";
import prizeService from "../prize/prize.service";
import winnerServices from "../winner/winner.service";
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

const findManyUserEvents = async (id: string) => {
  const events = await eventRepository.findMany(id);
  if (!events) throw new Error("Fail to find event");
  const eventPrizesPromise = Promise.all(
    events?.map((event) => {
      return prizeService.findByEventId(event.id);
    }),
  );
  const result = await eventPrizesPromise;
  return result.map((prize, index) => {
    return {
      prizes: prize,
      ...events[index],
    };
  });
};

const getEventWiner = async (eventId: string): Promise<SlotExpand> => {
  // hash (seed + eventId + (participants -> normalize -> hash)) % length
  const event = await eventRepository.findById(eventId);
  if (!event) throw new Error("Event not found!");
  if (event.status == EventStatus.CLOSE) throw new Error("Event had closed");
  if (event.status != EventStatus.LOCKED)
    throw new Error("Event need to be LOCK");
  const slots = await slotRepository.findManyByEvent(eventId);
  if (!slots || slots.length == 0) throw new Error("No participant found");
  const participants = slots.filter((slot) => slot.profile);
  const participantsPayload = createParticipantsPayload(participants);
  const participantsHash = hash(participantsPayload);
  const winnerIndex = getWinnerIndex(
    event.server_seed as string,
    eventId,
    participantsHash,
    participants.length,
  );
  const winner = participants[winnerIndex];
  const prize = await prizeService.findByEventId(event.id);
  if (!prize) throw new Error("Prize not found");
  // update event status
  await eventRepository.updateStatus(event, EventStatus.CLOSE);
  // save winner
  await winnerServices.create({
    user: winner.user_id as string,
    event: winner.event_id,
    prize: prize[0].id,
  });
  return winner;
};

const updateStatus = async (
  eventId: string,
  status: EventStatus,
): Promise<Event | null> => {
  const event = await eventRepository.findById(eventId);
  if (!event) throw new Error("Failed to find event");
  const result = await eventRepository.updateStatus(event, status);
  if (!status) throw new Error("Failed to update event status");
  return result;
};

const findManyByArray = async (ids: string[]): Promise<Event[] | null> => {
  const events = await eventRepository.findManyByArray(ids);
  return events;
};

const eventServices = {
  createEvent,
  findById,
  getEventWiner,
  updateStatus,
  findManyByArray,
  findManyUserEvents,
};
export default eventServices;
