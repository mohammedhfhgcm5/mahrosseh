import type { ReactNode } from "react";

export default function OrderoLayout({ children }: { children: ReactNode }) {
  return <div className="flex min-h-full flex-col bg-page">{children}</div>;
}
