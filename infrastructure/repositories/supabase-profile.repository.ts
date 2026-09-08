import { Profile } from "@/domain/entities/profile";
import { ProfileRepository } from "@/domain/repositories/profile.repository";
import { SupabaseClient } from "@supabase/supabase-js";

export class SubpabaseProfileRepository implements ProfileRepository {
  constructor(private readonly supabaseClient: SupabaseClient) {}
  async findById(id: string): Promise<Profile | null> {
    const { data, error } = await this.supabaseClient
      .from("profiles")
      .select("*")
      .eq("id", id)
      .single();
    if (error) {
      throw error;
    }
    return this.toDomain(data);
  }

  // @ts-ignore
  toDomain(data: any): Profile {
    return {
      id: data.id,
      display_name: data.display_name,
      email: data.email,
      avatar_url: data.avatar_url,
      created_at: data.created_at,
    };
  }
}
