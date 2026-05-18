import type { Metadata } from 'next';
import GraphicDesignCapabilityContent from '@/components/GraphicDesignCapabilityContent';

export const metadata: Metadata = {
  title: 'Graphic Design — PixelCypherStudio',
  description:
    'Kinetic brand anatomy from PixelCypher Studio — deconstructing the creative process behind identity, visual systems, and chromatic design.',
};

export default function GraphicDesignCapabilityPage() {
  return <GraphicDesignCapabilityContent />;
}
