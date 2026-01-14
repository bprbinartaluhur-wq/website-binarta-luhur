import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: 'Binarta Luhur',
  description: 'Landing page website perusahaan Binarta Luhur.',
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
      </head>
      <body className="font-body bg-background antialiased pt-24">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
