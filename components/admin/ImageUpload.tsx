"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Upload } from "lucide-react";
import { readApiJson } from "@/lib/client";

type ImageUploadProps = {
  value: string;
  onChange: (url: string) => void;
  label?: string;
};

export function ImageUpload({ value, onChange, label = "صورة الصنف" }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(file: File) {
    setError("");
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await readApiJson<{ error?: string; url?: string }>(response);
      if (!response.ok || !data.url) {
        setError(data.error || "فشل رفع الصورة");
        return;
      }
      onChange(data.url);
    } catch {
      setError("تعذر رفع الصورة");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <p className="mb-2 text-sm font-semibold text-zinc-700">{label}</p>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => {
          event.preventDefault();
          const file = event.dataTransfer.files[0];
          if (file) void handleFile(file);
        }}
        className="flex w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-pink-200 bg-cream/40 px-4 py-8 text-center"
      >
        {value ? (
          <span className="relative h-28 w-28 overflow-hidden rounded-2xl">
            <Image src={value} alt="معاينة" fill className="object-cover" unoptimized />
          </span>
        ) : (
          <Upload className="h-8 w-8 text-brand" />
        )}
        <p className="mt-3 text-sm font-semibold text-zinc-700">
          {uploading ? "جاري الرفع..." : "اضغط لرفع صورة أو اسحبها هنا"}
        </p>
        <p className="mt-1 text-xs text-zinc-400">PNG, JPG, GIF حتى 5MB</p>
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/gif,image/webp"
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) void handleFile(file);
        }}
      />
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="أو الصق رابط الصورة"
        className="mt-3 w-full rounded-xl border border-pink-100 bg-white px-3 py-2 text-sm outline-none focus:border-brand"
      />
      {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
    </div>
  );
}
