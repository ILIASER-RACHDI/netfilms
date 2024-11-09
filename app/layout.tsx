// layout.tsx
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from '../components/Header';
import Navbar from '../components/Navbar'; 

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
  title: "NetFilm",
  description: "movie data base",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Header /> {/* Le header en haut avec le logo et la barre de recherche */}
        <div className="flex h-screen">
          <Navbar /> {/* La barre de navigation à gauche */}
          <main className="flex-1 overflow-y-auto p-6">
            {children} {/* Le contenu principal, où les résultats seront affichés */}
          </main>
        </div>
      </body>
    </html>
  );
}
