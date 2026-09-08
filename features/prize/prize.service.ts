import { CreatePrize } from "./prize.schema";
import prizeRepository from "./prize.repository";
const createPrize = async (data: CreatePrize) => {
  return await prizeRepository.create(data);
};
const createManyPrizes = async (data: CreatePrize[]) => {
  return await prizeRepository.createMany(data);
};

const findByEventId = async (id: string) => {
  return await prizeRepository.findByEventId(id);
};

const prizeServices = { createManyPrizes, createPrize, findByEventId };
export default prizeServices;
