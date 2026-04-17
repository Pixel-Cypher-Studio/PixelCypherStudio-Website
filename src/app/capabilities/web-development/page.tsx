import type { Metadata } from 'next';
import WebDevelopmentCapabilityContent from '@/components/WebDevelopmentCapabilityContent';

export const metadata: Metadata = {
  title: 'Web Development — PixelCypher',
  description:
    'A premium interactive capability page showcasing PixelCypher web development systems, engineering, and launch workflows.',
};

export default function WebDevelopmentCapabilityPage() {
  return <WebDevelopmentCapabilityContent />;
}
