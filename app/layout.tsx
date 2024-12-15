'use client';
import './globals.css';
import localFont from "next/font/local";
import SessionWrapper from '@/lib/SessionWrapper';
import { ThemeProvider } from 'next-themes';

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
 /* useEffect(() => {
    // Redirige l'utilisateur vers /Auth s'il n'est pas connecté et qu'il n'est pas déjà sur la page d'authentification
    if (!isAuthenticated() && !isAuthPage) {
      router.push('/Auth');
    }
  }, [pathname, router, isAuthPage]);
*/
/*
<SessionWrapper>
    <html lang="en">
      <body 
          className="transition-colors duration-300">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          {isAuthPage ? (
            children
          ) : (
            // Sinon, affiche la sidebar et le contenu de l'application
            <SidebarProvider>
              <AppSidebar />
              <SidebarInset>
                <SidebarTrigger /> 
                {children}
              </SidebarInset>
            </SidebarProvider>
          )}
        </ThemeProvider>
      </body>
    </html>
    </SessionWrapper>
*/ 
  return (
  <SessionWrapper>
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange>
        <main>
          {children}
        </main>
        </ThemeProvider>
      </body>
    </html>
  </SessionWrapper>
  );
}
