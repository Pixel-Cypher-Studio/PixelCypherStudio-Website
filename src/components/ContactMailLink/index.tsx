'use client';

import type { ReactNode } from 'react';

type ContactMailLinkProps = {
  email: string;
  subject?: string;
  body?: string;
  className?: string;
  children: ReactNode;
};

export default function ContactMailLink({
  email,
  subject = '',
  body = '',
  className,
  children,
}: ContactMailLinkProps) {
  const handleClick = () => {
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    const mailtoUrl = `mailto:${email}?subject=${subject}&body=${body}`;
    const gmailWebUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = isMobile ? mailtoUrl : gmailWebUrl;
  };

  return (
    <button type="button" onClick={handleClick} className={className}>
      {children}
    </button>
  );
}