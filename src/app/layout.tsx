import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Mognadsmätaren | Critero Consulting",
  description: "Mät er organisations AI-mognad eller digitala mognad. Få en detaljerad rapport med AI-genererade insikter och rekommendationer.",
  keywords: ["mognadsmätning", "AI-mognad", "digital mognad", "AI maturity", "digital maturity", "Critero"],
  authors: [{ name: "Critero Consulting AB" }],
  openGraph: {
    title: "Mognadsmätaren | Critero Consulting",
    description: "Mät er organisations AI-mognad eller digitala mognad med AI-genererade insikter",
    type: "website",
    siteName: "Mognadsmätaren",
    locale: "sv_SE",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mognadsmätaren | Critero Consulting",
    description: "Mät er organisations AI-mognad eller digitala mognad med AI-genererade insikter",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
