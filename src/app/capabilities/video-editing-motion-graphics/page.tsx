import type { Metadata } from 'next';
import  VideoEditingMotionGraphics  from '@/components/VideoEditingMotionGraphics';

export const metadata: Metadata = {
  title: 'Video Editing & Motion Graphics — PixelCypherStudio',
  description:
    `A premium capability page showcasing PixelCypherStudio's video editing and motion graphics expertise, from cinematic storytelling to animated visuals.`,
};

export default function VideoEditingMotionGraphicsCapabilityPage() {
  return <VideoEditingMotionGraphics />;
}