import { createClient } from "@/infrastructure/supabase/client";
import { SupabaseClient } from "@supabase/supabase-js";
import { Profile } from "./profile.schema";

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
}

export default new ProfileRepository();
