import type { Metadata } from 'next';
import { Space_Grotesk, Inter } from 'next/font/google';
import { Bebas_Neue, DM_Sans } from "next/font/google";
import Providers from '@/components/Providers';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import InteractiveBackground from '@/components/InteractiveBackground';
// import ScrollProgress from '@/components/ScrollProgress';
import './globals.css';
import '@/styles/globals.scss';

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
});

const dmSans = DM_Sans({
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-dm",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600'],
});

export const metadata: Metadata = {
  title: 'PixelCypherStudio — A Hyper-Kinetic Design Studio',
  description:
    'A hyper-kinetic design studio specializing in digital motion, neon aesthetics, and immersive brand identities that break through the noise.',
  keywords: ['design studio', 'motion design', 'branding', 'UI/UX', 'WebGL', '3D'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${inter.variable} ${bebas.variable} ${dmSans.variable}`}
    >
<body>
    <Providers>
      <InteractiveBackground />
      {/* <ScrollProgress /> */}
      <Navbar />
      <main>{children}</main>
      <Footer />
    </Providers>
  </body>
    </html>
  );
}
