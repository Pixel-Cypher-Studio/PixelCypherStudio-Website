import type { Metadata } from 'next';
import NotFoundPage from '@/components/NotFoundPage/NotFoundPage';

export const metadata: Metadata = {
  title: '404 — Page Not Found | PixelCypher',
  description: 'The page you are looking for does not exist.',
};

export default function NotFound() {
  return <NotFoundPage />;
}
