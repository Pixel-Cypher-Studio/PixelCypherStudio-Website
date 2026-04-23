import type { Metadata } from 'next';
import  VideoEditingMotionGraphicsContent  from '@/components/VideoEditingMotionGraphics';

export const metadata: Metadata = {
  title: 'Video Editing & Motion Graphics — PixelCypher',
  description:
    'A premium capability page showcasing PixelCypher video editing and motion graphics expertise, from cinematic storytelling to animated visuals.',
};

export default function VideoEditingMotionGraphicsCapabilityPage() {
  return <VideoEditingMotionGraphicsContent />;
}