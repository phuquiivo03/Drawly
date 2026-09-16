import winnerRepository from "./winner.repository";
import { CreateWinner, Winner } from "./winner.schema";

const create = async (winnerData: CreateWinner): Promise<Winner | null> => {
  try {
    return await winnerRepository.create(winnerData);
  } catch (e) {
    throw e;
  }
};

const findMany = async (page: number, limit: number) => {
  try {
    const data = await winnerRepository.findMany(page, limit);
    return data;
  } catch (e) {
    throw e;
  }
};

const winnerServices = { create, findMany };
export default winnerServices;
