import type { HTMLAttributes, ReactNode } from "react";

export function Section({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`px-4 py-16 sm:px-6 lg:px-8 ${className}`}>{children}</section>;
}

export function SectionInner({ children, className = "", ...props }: HTMLAttributes<HTMLDivElement> & { children: ReactNode }) {
  return <div className={`mx-auto max-w-7xl ${className}`} {...props}>{children}</div>;
}
