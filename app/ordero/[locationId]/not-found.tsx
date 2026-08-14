import Link from "next/link";

export default function OrderoNotFound() {
  return (
    <div className="flex min-h-full flex-col items-center justify-center px-4 text-center">
      <h1 className="text-2xl font-extrabold text-brand">اوردر</h1>
      <p className="mt-3 max-w-md text-zinc-600">هذا الفرع غير موجود أو تم حذف رابط الطلب.</p>
      <Link href="/" className="mt-6 rounded-full bg-brand px-6 py-3 text-sm font-bold text-white">
        العودة للمنيو
      </Link>
    </div>
  );
}
