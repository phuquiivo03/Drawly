import { createClient } from "@/infrastructure/supabase/client";
import { SupabaseClient } from "@supabase/supabase-js";
import { CreateEvent, Event, EventStatus, EventWinner } from "./event.schema";

class EventRepository {
  private readonly supabaseClient: SupabaseClient;
  constructor() {
    this.supabaseClient = createClient();
  }
  async findById(id: string): Promise<Event | null> {
    const { data, error } = await this.supabaseClient
      .from("events")
      .select("id,status,server_seed_hash,lock_at,creator_id,created_at")
      .eq("id", id)
      .single();
    if (error) {
      throw error;
    }
    return data;
  }

  async findMany(id: string): Promise<Event[] | null> {
    const { data, error } = await this.supabaseClient
      .from("events")
      .select("id,status,server_seed_hash,lock_at,creator_id,created_at")
      .eq("creator_id", id);
    if (error) {
      throw error;
    }
    return data;
  }

  async create(event: CreateEvent): Promise<Event | null> {
    const { data, error } = await this.supabaseClient
      .from("events")
      .insert({ ...event, status: EventStatus.OPEN })
      .select("id,status,server_seed_hash,lock_at,creator_id,created_at");
    if (error) {
      throw error;
    }
    return data[0];
  }

  async updateStatus(
    event: Event,
    newStatus: EventStatus,
  ): Promise<Event | null> {
    // filter condition for status update
    switch (newStatus) {
      case EventStatus.LOCKED: {
        // open | full -> lock
        if (
          event.status != EventStatus.OPEN &&
          event.status != EventStatus.FULL
        )
          throw new Error("Need OPEN or FULL status to update to ClOSE");
        break;
      }
      case EventStatus.DRAWING: {
        // locked -> drawing
        if (event.status != EventStatus.LOCKED)
          throw new Error("Need CLOSE status to update to DRAWING");
        break;
      }
      case EventStatus.FULL: {
        // open -> full
        if (event.status != EventStatus.OPEN)
          throw new Error("Need OPEN status to update to FULL");
        break;
      }
    }
    const { data, error } = await this.supabaseClient
      .from("events")
      .update({
        status: newStatus,
      })
      .eq("id", event.id)
      .select("id,status,server_seed_hash,lock_at,creator_id,created_at")
      .single();
    if (error) throw error;
    return data;
  }

  async findManyByArray(ids: string[]): Promise<Event[] | null> {
    const { data, error } = await this.supabaseClient
      .from("events")
      .select("id,status,server_seed_hash,lock_at,creator_id,created_at")
      .in("id", ids);
    if (error) throw error;
    return data;
  }
}
const eventRepository = new EventRepository();
export default eventRepository;
