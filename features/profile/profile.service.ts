import profileRepository from "./profile.repository";
import { CreateProfile, Profile } from "./profile.schema";

const findById = async (id: string): Promise<Profile | null> => {
  return await profileRepository.findById(id);
};
const create = async (data: CreateProfile): Promise<Profile | null> => {
  return await profileRepository.create(data);
};
const findBySocialId = async (id: string): Promise<Profile | null> => {
  return await profileRepository.findBysocialId(id);
};
const profileServices = { findById, create, findBySocialId };
export default profileServices;
