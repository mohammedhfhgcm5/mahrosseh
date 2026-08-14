import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/api";
import { isCloudinaryConfigured, uploadImageBuffer } from "@/lib/cloudinary";

export async function POST(request: Request) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  if (!isCloudinaryConfigured()) {
    return NextResponse.json(
      { error: "أضف بيانات Cloudinary في ملف .env أولاً" },
      { status: 500 },
    );
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "لم يتم اختيار صورة" }, { status: 400 });
  }

  if (file.size > 5 * 1024 * 1024) {
    return NextResponse.json({ error: "الحد الأقصى للصورة 5MB" }, { status: 400 });
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  const uploaded = await uploadImageBuffer(bytes);

  return NextResponse.json({ url: uploaded.secure_url });
}
