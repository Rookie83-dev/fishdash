import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "FishDash",
  description: "Ribolovački mini-dashboard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark:bg-neutral-950 bg-white">
      <body className="min-h-screen pb-20 text-neutral-900 dark:text-neutral-100">

        {/* PAGE CONTENT */}
        <div className="max-w-4xl mx-auto p-4">
          {children}
        </div>

        {/* BOTTOM NAVIGATION */}
        <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 shadow-lg">
          <div className="max-w-4xl mx-auto flex justify-around py-3 text-sm">

            <Link
              href="/"
              className="flex flex-col items-center hover:opacity-80 transition"
            >
              <span>🏠</span>
              <span>Početna</span>
            </Link>

            <Link
              href="/reke"
              className="flex flex-col items-center hover:opacity-80 transition"
            >
              <span>🌊</span>
              <span>Reke</span>
            </Link>

            <Link
              href="/vreme"
              className="flex flex-col items-center hover:opacity-80 transition"
            >
              <span>☁️</span>
              <span>Vreme</span>
            </Link>

            <Link
              href="/mesec"
              className="flex flex-col items-center hover:opacity-80 transition"
            >
              <span>🌙</span>
              <span>Mesec</span>
            </Link>

            <Link
              href="/ai"
              className="flex flex-col items-center hover:opacity-80 transition"
            >
              <span>🤖</span>
              <span>AI</span>
            </Link>

          </div>
        </nav>

      </body>
    </html>
  );
}