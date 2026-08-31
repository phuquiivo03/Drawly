import { ProfileRepository } from "@/domain/repositories/profile.repository";

export class GetProfileUSecase {
  constructor(private readonly profileRepository: ProfileRepository) {}
  async excute(id: string) {
    const profile = await this.profileRepository.findById(id);
    if (!profile) throw "now found";
    return profile;
  }
}
