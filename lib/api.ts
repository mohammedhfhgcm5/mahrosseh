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
