'use client'

import AppSideBar from "@/components/app.sidebar";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Container, ThemeProvider } from "@mui/material";
import theme from "./theme";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const robotoBold = localFont({
  src: "./fonts/Roboto-Bold.ttf",
  variable: "--font-roboto-bold",
  weight: "100 900",
});
const robotoMedium = localFont({
  src: "./fonts/Roboto-Medium.ttf",
  variable: "--font-roboto-medium",
  weight: "100 900",
});
const robotoThin = localFont({
  src: "./fonts/Roboto-Thin.ttf",
  variable: "--font-roboto-thin",
  weight: "100 900",
});


// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${robotoBold.variable} ${robotoThin.variable}`}>
        <ThemeProvider theme={theme}>
          <AppSideBar />
          <Container
          >
            {children}
          </Container>
        </ThemeProvider>
      </body>
    </html>
  );
}
