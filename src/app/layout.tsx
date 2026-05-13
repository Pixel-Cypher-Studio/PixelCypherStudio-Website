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
  metadataBase: new URL('https://www.pixelcypherstudio.in'),
  title: {
    default: 'PixelCypher Studio — A Hyper-Kinetic Design Studio',
    template: '%s | PixelCypher Studio',
  },
  description:
    'PixelCypher Studio is a high-fidelity creative studio based in Kalyan, Mumbai — crafting brands that move. Specializing in branding, motion graphics, web development, packaging, and immersive digital experiences since 2017.',
  keywords: [
    'PixelCypher Studio',
    'design studio',
    'branding agency',
    'motion graphics',
    'web development',
    'UI UX design',
    'digital identity',
    'brand identity',
    'packaging design',
    'graphic design',
    'WebGL',
    'interactive experiences',
    'video editing',
    'visual storytelling',
    'creative studio India',
    // local SEO
    'design studio in Kalyan',
    'design studio in Mumbai',
    'design studio in Thane',
    'branding agency Kalyan',
    'branding agency Mumbai',
    'branding agency Thane',
    'web development Kalyan',
    'web development Mumbai',
    'graphic design Kalyan',
    'graphic design Mumbai',
    'graphic design Thane',
    'creative agency Kalyan',
    'creative agency Mumbai',
    'creative agency Navi Mumbai',
    'design studio Maharashtra',
  ],
  authors: [{ name: 'PixelCypher Studio', url: 'https://www.pixelcypherstudio.in' }],
  creator: 'PixelCypher Studio',
  publisher: 'PixelCypher Studio',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.pixelcypherstudio.in',
    siteName: 'PixelCypher Studio',
    title: 'PixelCypher Studio — A Hyper-Kinetic Design Studio',
    description:
      'A high-fidelity creative studio at the intersection of brutalist architecture and neon aesthetics. We craft brands, motion systems, and digital monoliths for the relentless.',
    images: [
      {
        url: '/images/logo/pixelcypherstudio.webp',
        width: 1200,
        height: 630,
        alt: 'PixelCypher Studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PixelCypher Studio — A Hyper-Kinetic Design Studio',
    description:
      'A high-fidelity creative studio crafting brands that move — branding, motion, web, and immersive digital experiences.',
    images: ['/images/logo/pixelcypherstudio.webp'],
    creator: '@pixelcypherstudio',
  },
  icons: {
    icon: '/images/logo/pixelcypherstudio.webp',
  },
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
