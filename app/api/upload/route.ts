import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { requireAdmin, serverError } from "@/lib/api";
import { isCloudinaryConfigured, uploadImageBuffer } from "@/lib/cloudinary";

export async function POST(request: Request) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || typeof file === "string") {
      return NextResponse.json({ error: "لم يتم اختيار صورة" }, { status: 400 });
    }

    const blob = file as Blob;
    if (blob.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "الحد الأقصى للصورة 5MB" }, { status: 400 });
    }

    const bytes = Buffer.from(await blob.arrayBuffer());
    const originalName = "name" in file ? String((file as File).name) : "image.jpg";

    if (isCloudinaryConfigured()) {
      try {
        const uploaded = await uploadImageBuffer(bytes);
        return NextResponse.json({ url: uploaded.secure_url });
      } catch (error) {
        console.error("Cloudinary upload failed, saving locally", error);
      }
    }

    const ext = path.extname(originalName) || ".jpg";
    const filename = `${randomUUID()}${ext}`;
    const dir = path.join(process.cwd(), "public", "uploads");
    await mkdir(dir, { recursive: true });
    await writeFile(path.join(dir, filename), bytes);

    return NextResponse.json({ url: `/uploads/${filename}` });
  } catch (error) {
    return serverError(error, "تعذر رفع الصورة");
  }
}
