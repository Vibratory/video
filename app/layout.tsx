import type { Metadata } from "next";
import localFont from "next/font/local";
import Head from 'next/head';

import {
  ClerkProvider,
  //SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import "./globals.css";

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

export const metadata: Metadata = {
  title: "Icarus Airlines",
  description: "Video Inteview",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
    <html lang="en">
      <Head>
      <link rel="icon" href="/ico.png" type="image/x-icon" />

      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
         <SignedOut>
    </SignedOut>
    <SignedIn>
      <UserButton />
    </SignedIn>
        {children}
      </body>
    </html>
    </ClerkProvider>
  );
}
