import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Web3Provider } from "@/components/Web3Provider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { CartProvider } from "@/context/CartContext";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EasyPicks - Transparent Pick'em on Base",
  description: "Predict exact scores, win USDC prizes. Fully transparent crypto fantasy sports on Base chain.",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.className} antialiased`}>
        <Web3Provider>
          <CartProvider>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
              <CartDrawer />
            </div>
          </CartProvider>
        </Web3Provider>
      </body>
    </html>
  );
}

