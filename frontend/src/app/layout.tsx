import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "Aurelia Library", description: "Premium digital library" };
export default function RootLayout({ children }: { children: React.ReactNode }) { return <html lang="en"><body>{children}</body></html>; }
