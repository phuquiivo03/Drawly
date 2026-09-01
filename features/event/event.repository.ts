import { createClient } from "@/infrastructure/supabase/client";
import { SupabaseClient } from "@supabase/supabase-js";
import { CreateEvent, Event, EventStatus } from "./event.schema";

class EventRepository {
  private readonly supabaseClient: SupabaseClient;
  constructor() {
    this.supabaseClient = createClient();
  }
  async findById(id: string): Promise<Event | null> {
    const { data, error } = await this.supabaseClient
      .from("events")
      .select("*")
      .eq("id", id)
      .single();
    if (error) {
      throw error;
    }
    return data;
  }

  async create(event: CreateEvent): Promise<Event | null> {
    const { data, error } = await this.supabaseClient
      .from("events")
      .insert({ ...event, status: EventStatus.OPEN })
      .select();
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
      }
      case EventStatus.DRAWING: {
        // locked -> drawing
        if (event.status != EventStatus.LOCKED)
          throw new Error("Need CLOSE status to update to DRAWING");
      }
      case EventStatus.FULL: {
        // open -> full
        if (event.status != EventStatus.OPEN)
          throw new Error("Need OPEN status to update to FULL");
      }
    }
    const { data, error } = await this.supabaseClient
      .from("events")
      .update({
        status: newStatus,
      })
      .eq("id", event.id);
    if (error) throw error;
    return data;
  }
}

export default new EventRepository();
