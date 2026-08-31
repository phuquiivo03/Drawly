import { Profile } from "../entities/profile";

export interface ProfileRepository {
   findById(id: string): Promise<Profile | null>;
}
