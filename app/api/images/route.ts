import { supabaseAdmin } from "@/infrastructure/supabase/admin";
import { requireAuth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { user, response } = await requireAuth();

  if (!user) {
    return response;
  }
  try {
    const formData = await request.formData();

    const files = formData.getAll("images");

    const urls = await Promise.all(
      files.map(async (item) => {
        if (!(item instanceof File)) {
          throw new Error("Invalid file");
        }

        const fileName = `${crypto.randomUUID()}.jpg`;
        const filePath = `uploads/${fileName}`;

        const { error } = await supabaseAdmin.storage
          .from("prizeImages")
          .upload(filePath, item, {
            contentType: "image/jpeg",
            upsert: false,
          });

        if (error) {
          throw error;
        }

        const { data } = supabaseAdmin.storage
          .from("prizeImages")
          .getPublicUrl(filePath);

        return data.publicUrl;
      }),
    );

    return NextResponse.json({
      urls,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to upload images" },
      { status: 500 },
    );
  }
}
