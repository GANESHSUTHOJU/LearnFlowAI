
'use client';

import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from '@/hooks/use-auth';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" className="dark">
      <head>
        <title>LearnFlowAI</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased min-h-screen bg-background flex flex-col app-background">
        <AuthProvider>
            <div className="flex-1 flex flex-col relative z-10">
                {children}
            </div>
            <footer className="text-center p-4 text-xs text-muted-foreground relative z-10">
                © 2025 all rights reserved to Botla Varshini
            </footer>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
