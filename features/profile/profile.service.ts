import profileRepository from "./profile.repository";
import { Profile } from "./profile.schema";

const findById = async (id: string): Promise<Profile | null> => {
  return await profileRepository.findById(id);
};
const profileServices = { findById };
export default profileServices;
