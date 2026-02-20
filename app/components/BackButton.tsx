"use client";

import { useRouter } from "next/navigation";

type Props = {
  href?: string;           // <=== OVO JE KLJUČNO
  fallback?: string;
  className?: string;
  label?: string;
};

export default function BackButton({
  href,
  fallback = "/",
  className = "text-blue-500 hover:underline mb-4 inline-flex items-center gap-1",
  label = "Nazad",
}: Props) {
  const router = useRouter();

  const onClick = () => {
    if (href) {
      router.push(href);
      return;
    }

    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push(fallback);
    }
  };

  return (
    <button onClick={onClick} className={className} aria-label={label}>
      ← {label}
    </button>
  );
}