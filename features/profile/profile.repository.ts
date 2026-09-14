import { createClient } from "@/infrastructure/supabase/client";
import { SupabaseClient } from "@supabase/supabase-js";
import { CreateProfile, Profile } from "./profile.schema";

class ProfileRepository {
  private readonly supabaseClient: SupabaseClient;
  constructor() {
    this.supabaseClient = createClient();
  }
  async findById(id: string): Promise<Profile | null> {
    const { data, error } = await this.supabaseClient
      .from("profiles")
      .select("*")
      .eq("id", id)
      .single();
    if (error) {
      throw error;
    }
    return data;
  }

  async findBysocialId(id: string): Promise<Profile | null> {
    const { data, error } = await this.supabaseClient
      .from("profiles")
      .select("*")
      .eq("social_ref_id", id)
      .maybeSingle();
    if (error) {
      throw error;
    }
    return data;
  }

  async create(createData: CreateProfile): Promise<Profile | null> {
    const { data, error } = await this.supabaseClient
      .from("profiles")
      .insert(createData)
      .single();
    if (error) {
      throw error;
    }
    return data;
  }
}

const profileRepository = new ProfileRepository();
export default profileRepository;
