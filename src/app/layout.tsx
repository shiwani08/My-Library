import type { Metadata } from "next";
import { MedievalSharp, UnifrakturMaguntia } from "next/font/google";
import "./globals.css";
import Navbar from "../shared/components/navbar";
import Footer from "../shared/components/footer";
import StoreProvider from "../store/StoreProvider";
import { Store } from "lucide";

// Import your magical fonts
const medievalSharp = MedievalSharp({
  variable: "--font-medieval-sharp",
  weight: "400",
  subsets: ["latin"],
});

const unifraktur = UnifrakturMaguntia({
  variable: "--font-unifraktur",
  weight: "400",
  subsets: ["latin"],
});

// Metadata for the site
export const metadata: Metadata = {
  title: "The Ravenclaw Library",
  description: "Where wisdom meets wonder.",
  icons: { icon: "/booked-logo.png" },
};

// Root layout
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${medievalSharp.variable} ${unifraktur.variable} antialiased`}
      >
        <StoreProvider>
          <nav className="navbar-container">
            <Navbar />
          </nav>

          <main className="page-content">{children}</main>

          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
