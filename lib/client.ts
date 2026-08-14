export async function readApiJson<T extends { error?: string }>(response: Response): Promise<T> {
  const text = await response.text();
  if (!text) {
    return { error: "استجابة فارغة من الخادم" } as T;
  }
  try {
    return JSON.parse(text) as T;
  } catch {
    return { error: "تعذر قراءة رد الخادم" } as T;
  }
}
