import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "light" | "ghost";
};

const styles = {
  primary: "bg-pine text-white hover:bg-ink",
  secondary: "border border-steel bg-white text-pine hover:border-pine hover:bg-mint",
  light: "bg-white text-ink hover:bg-mint",
  ghost: "text-pine hover:text-ink"
};

export function ButtonLink({ href, children, variant = "primary", className = "", ...props }: Props) {
  const classes = `inline-flex min-h-11 items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition ${styles[variant]} ${className}`;

  if (href.startsWith("http")) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  );
}
