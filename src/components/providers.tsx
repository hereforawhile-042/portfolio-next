"use client";

import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Preloader } from "@/components/preloader";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <AuthProvider>
        <Preloader />
        {children}
      </AuthProvider>
    </NextThemesProvider>
  );
}
