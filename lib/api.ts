import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";

export async function requireAdmin() {
  const ok = await getAdminSession();
  if (!ok) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }
  return null;
}

export function badRequest(message: string) {
  return NextResponse.json({ error: message }, { status: 400 });
}

export function serverError(error: unknown, fallback = "حدث خطأ أثناء الحفظ") {
  console.error(error);
  const message = error instanceof Error ? error.message : "";
  if (
    message.includes("Can't reach database") ||
    message.includes("P1001") ||
    message.includes("HOST:5432")
  ) {
    return NextResponse.json(
      { error: "لا يمكن الاتصال بقاعدة البيانات. تأكد من DATABASE_URL في ملف .env" },
      { status: 500 },
    );
  }
  return NextResponse.json({ error: fallback }, { status: 500 });
}
