"use client";
import { useRef, useState } from "react";
import { CalendarClock, Loader, Loader2, Users, X } from "lucide-react";
import { json, z } from "zod";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Input from "../ui/input";
import UploadedImage from "./UploadedImage";
import UploadImageButton from "./UploadImageButton";
import { compressImage } from "@/lib/image.helper";
import { toast } from "react-toastify";
import { CreateEventRequest } from "@/features/event/event.schema";
import { useRouter } from "next/navigation";

const eventSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Event name is required")
    .max(80, "Keep it under 80 characters"),
  description: z
    .string()
    .min(1)
    .trim()
    .max(500, "Keep it under 500 characters"),
  maxSlots: z
    .number()
    .int()
    .min(2, "At least 2 slots")
    .max(500, "Up to 500 slots"),
  lockTime: z
    .string()
    .min(0, "Pick when the event locks and starts the draw")
    .optional(),
});

type FormErrors = Partial<
  Record<
    "name" | "description" | "maxSlots" | "lockTime" | "images",
    string | undefined
  >
>;

export default function CreateEventForm() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [maxSlots, setMaxSlots] = useState("12");
  const [lockTime, setLockTime] = useState("");
  const [images, setImages] = useState<
    { url: string; name: string; file: File }[]
  >([]);
  const [errors, setErrors] = useState<FormErrors>({});

  const addImages = async (files: FileList | null) => {
    if (!files) return;
    const next = await Promise.all(
      Array.from(files)
        .filter((file) => file.type.startsWith("image/"))
        .map(async (file) => {
          const compressedFile = await compressImage(file, 30);

          return {
            url: URL.createObjectURL(compressedFile),
            name: compressedFile.name,
            file: compressedFile,
          };
        }),
    );
    if (next.length === 0) {
      setErrors((prev) => ({
        ...prev,
        images: "Only image files are allowed",
      }));
      return;
    }
    setImages((prev) => [...prev, ...next].slice(0, 8));
    setErrors((prev) => ({ ...prev, images: undefined }));
  };

  const removeImage = (index: number) => {
    setImages((prev) => {
      const removed = prev[index];
      if (removed) URL.revokeObjectURL(removed.url);
      return prev.filter((_, i) => i !== index);
    });
  };
  const route = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    setLoading(true);
    event.preventDefault();
    const result = eventSchema.safeParse({
      name,
      description,
      maxSlots: Number(maxSlots),
      lockTime,
    });
    const fieldErrors: FormErrors = {};

    if (!result.success) {
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof FormErrors;
        fieldErrors[field] = issue.message;
      }
    }
    if (images.length === 0) {
      fieldErrors.images = "Add at least one reward image";
    }
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    try {
      const urls = await handleUploadImages();

      if (!urls) return;

      const eventData: CreateEventRequest = {
        creator_id: "123e4567-e89b-12d3-a456-426614174000",
        max_slot: maxSlots,
        lock_at: lockTime,
        prizes: [
          {
            name,
            description,
            images: urls.urls,
          },
        ],
      };
      console.log("create event data :", eventData);
      const response = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) {
        throw new Error("Failed to create event");
      }

      const data = await response.json();

      if (data) {
        setLoading(false);
        route.push(`/events/${data.data.id}`);
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to create event";
      setLoading(false);
      toast.error(message);
    }
  };

  const handleUploadImages = async (): Promise<{ urls: string[] }> => {
    const formData = new FormData();
    images.forEach((image) => {
      formData.append("images", image.file);
    });

    const res = await fetch("/api/images", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      if (res.status === 403) throw new Error("Unauthorize");
      throw new Error("Upload failed");
    }

    return res.json();
  };

  const inputClass =
    "w-full rounded-xl border border-ink/10 bg-white/80 px-4 py-3 text-sm font-medium text-ink outline-none transition placeholder:text-ink/35 focus:border-brand focus:ring-2 focus:ring-brand/20";

  return (
    <div className="relative mx-auto max-w-2xl px-5 py-6 sm:px-8">
      <form
        onSubmit={handleSubmit}
        className="mt-6 rounded-[24px] border border-white/80 bg-white/60 p-6 shadow-2xl shadow-sky-200/50 backdrop-blur-2xl sm:p-8"
      >
        <h1 className="font-display text-2xl font-bold sm:text-3xl">
          Create a new event
        </h1>
        <p className="mt-1 text-sm text-ink/55">
          Set the reward, the slots, and when the draw locks and spins.
        </p>

        <div className="mt-6 space-y-5">
          <Input
            id={"event-name"}
            label={<>Event name</>}
            value={name}
            onChange={(val) => {
              if (errors.name) setErrors({ ...errors, name: undefined });
              setName(val as string);
            }}
            className=""
          >
            {errors.name}
          </Input>

          <div>
            <label
              htmlFor="event-description"
              className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-ink/50"
            >
              Description
            </label>
            <textarea
              id="event-description"
              value={description}
              onChange={(e) => {
                if (errors.description)
                  setErrors({ ...errors, description: undefined });
                setDescription(e.target.value);
              }}
              placeholder="What is this draw about?"
              maxLength={500}
              rows={3}
              className={`${inputClass} resize-none`}
            />
            {errors.description && (
              <p className="mt-1.5 text-xs font-semibold text-accent">
                {errors.description}
              </p>
            )}
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Input
              type="number"
              id="event-slots"
              label={
                <>
                  <Users className="size-3.5" /> Max slots
                </>
              }
              value={maxSlots}
              onChange={(val) => {
                if (errors.maxSlots)
                  setErrors({ ...errors, maxSlots: undefined });
                setMaxSlots(val as string);
              }}
              className=""
            >
              {errors.maxSlots}
            </Input>

            <Input
              type="datetime-local"
              id="event-lock-time"
              label={
                <>
                  <CalendarClock className="size-3.5" /> Locks &amp; draws at
                  (optional)
                </>
              }
              value={lockTime}
              onChange={(val) => setLockTime(val as string)}
              className=""
            >
              {errors.lockTime}
            </Input>
          </div>

          <div>
            <span className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-ink/50">
              Reward images
            </span>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => {
                addImages(e.target.files);
                e.target.value = "";
              }}
            />
            <div className="grid grid-cols-4 gap-3">
              {images.map((image, index) => (
                <UploadedImage
                  url={image.url}
                  name={image.name}
                  removeImage={removeImage}
                  index={index}
                />
              ))}
              {images.length < 8 && (
                <UploadImageButton fileInputRef={fileInputRef} />
              )}
            </div>
            <p className="mt-1.5 text-xs text-ink/40">
              Up to 8 images. The first one is shown as the main reward.
            </p>
            {errors.images && (
              <p className="mt-1.5 text-xs font-semibold text-accent">
                {errors.images}
              </p>
            )}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-end gap-3">
          <Button asChild variant="ghost" className="rounded-xl text-ink/60">
            <Link href="/events">
              <X /> Cancel
            </Link>
          </Button>
          <Button
            type="submit"
            size="lg"
            className="rounded-xl bg-accent! px-8 font-bold text-white shadow-lg shadow-accent/25 hover:bg-accent/90"
          >
            Create event {loading && <Loader2 className="animate-spin" />}
          </Button>
        </div>
      </form>
    </div>
  );
}
