import { createClient } from "@/infrastructure/supabase/client";
import { SupabaseClient } from "@supabase/supabase-js";
import { CreateWinner, Winner } from "./winner.schema";

class WinnerRepository {
  private readonly supabaseClient: SupabaseClient;
  constructor() {
    this.supabaseClient = createClient();
  }
  async findById(id: string): Promise<Winner | null> {
    const { data, error } = await this.supabaseClient
      .from("winners")
      .select("*")
      .eq("id", id)
      .single();
    if (error) {
      throw error;
    }
    return data;
  }

  async findMany(page: number, limit: number): Promise<Winner[] | null> {
    const { data, error } = await this.supabaseClient
      .from("winners")
      .select("*,user:profiles(*),event:events(*),prize:prizes(*)")
      .range((page - 1) * limit, page * limit);
    if (error) {
      throw error;
    }
    return data;
  }

  async create(winner: CreateWinner): Promise<Winner | null> {
    const { data, error } = await this.supabaseClient
      .from("winners")
      .insert(winner)
      .select();
    if (error) {
      throw error;
    }
    return data[0];
  }
}
const winnerRepository = new WinnerRepository();
export default winnerRepository;
