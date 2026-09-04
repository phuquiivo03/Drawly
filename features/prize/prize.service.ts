import { CreatePrize } from "./prize.schema";
import prizeRepository from "./prize.repository";
export const createPrize = async (data: CreatePrize) => {
  return await prizeRepository.create(data);
};
export const createManyPrizes = async (data: CreatePrize[]) => {
  return await prizeRepository.createMany(data);
};

export const findByEventId = async (id: string) => {
  return await prizeRepository.findByEventId(id);
};
