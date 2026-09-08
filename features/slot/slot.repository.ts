import { createClient } from "@/infrastructure/supabase/client";
import { SupabaseClient } from "@supabase/supabase-js";
import { CreateSlot, ShortSlot, Slot, SlotStatus } from "./slot.schema";

class SlotRepository {
  private readonly supabaseClient: SupabaseClient;
  constructor() {
    this.supabaseClient = createClient();
  }
  async findById(id: string): Promise<Slot | null> {
    const { data, error } = await this.supabaseClient
      .from("slots")
      .select("*")
      .eq("id", id)
      .single();
    if (error) {
      throw error;
    }
    return data;
  }

  async findManyByEvent(eventId: string): Promise<ShortSlot[] | null> {
    const { data, error } = await this.supabaseClient
      .from("slots")
      .select("id, slot_number, user_id")
      .eq("event_id", eventId)
      .not("user_id", "is", null)
      .eq("status", SlotStatus.AVAILABLE);

    if (error) throw new Error("Fail to find participant");
    return data;
  }

  async create(slotData: CreateSlot): Promise<Slot | null> {
    const { data, error } = await this.supabaseClient
      .from("slots")
      .insert({ ...slotData, status: "available" })
      .select();
    if (error) {
      throw error;
    }
    return data[0];
  }

  async createMany(slotsData: any[]): Promise<Slot[] | null> {
    const { data, error } = await this.supabaseClient
      .from("slots")
      .insert(slotsData)
      .select();
    if (error) {
      throw error;
    }
    return data;
  }
}
const slotRepository = new SlotRepository();
export default slotRepository;
