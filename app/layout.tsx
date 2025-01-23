import type { Metadata } from "next";
import "./globals.css";
import { crimson, luckiestGuy } from "@/app/fonts";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { ModalProvider } from "@/components/providers/modal-provider";
import { EdgeStoreProvider } from "@/lib/edgestore";

export const metadata: Metadata = {
  title: "Oclap Note",
  description: "The connected workspace where better work happens.",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/illustrations/tab-logo.png",
        href: "/illustrations/tab-logo.png",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/illustrations/tab-logo-dark.png",
        href: "/illustrations/tab-logo-dark.png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}>
      <html lang="en" suppressHydrationWarning>
        <body className={`${crimson.variable} ${luckiestGuy.variable}`}>
          <EdgeStoreProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
              storageKey="note-niche-theme"
            >
              <ModalProvider />
              {children}
            </ThemeProvider>
          </EdgeStoreProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
