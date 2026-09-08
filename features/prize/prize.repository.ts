import { createClient } from "@/infrastructure/supabase/client";
import { SupabaseClient } from "@supabase/supabase-js";
import { CreatePrize, Prize } from "./prize.schema";

class PrizeRepository {
  private readonly supabaseClient: SupabaseClient;
  constructor() {
    this.supabaseClient = createClient();
  }
  async findById(id: string): Promise<Prize | null> {
    const { data, error } = await this.supabaseClient
      .from("prizes")
      .select("*")
      .eq("id", id)
      .single();
    if (error) {
      throw error;
    }
    return data;
  }

  async findByEventId(id: string): Promise<Prize[] | null> {
    const { data, error } = await this.supabaseClient
      .from("prizes")
      .select("*")
      .eq("event_id", id);
    if (error) {
      throw error;
    }
    return data;
  }

  async create(prize: CreatePrize): Promise<Prize | null> {
    const { data, error } = await this.supabaseClient
      .from("prizes")
      .insert(prize)
      .select();
    if (error) {
      throw error;
    }
    return data[0];
  }

  async createMany(prizes: CreatePrize[]): Promise<Prize[] | null> {
    const { data, error } = await this.supabaseClient
      .from("prizes")
      .insert(prizes)
      .select();
    if (error) {
      throw error;
    }
    return data[0];
  }
}

const prizeRepository = new PrizeRepository();
export default prizeRepository;
