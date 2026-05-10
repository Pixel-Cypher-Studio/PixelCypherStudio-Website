import Link from 'next/link';
import styles from './NotFoundPage.module.scss';

export default function NotFoundPage() {
  return (
    <section className="relative flex min-h-[100dvh] items-center overflow-hidden py-24">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className={`${styles.orb} absolute h-[50vw] w-[50vw] max-h-[600px] max-w-[600px] rounded-full -top-[18%] -right-[10%] bg-[var(--primary-container)]`} />
        <div className={`${styles.orb} absolute h-[30vw] w-[30vw] max-h-[360px] max-w-[360px] rounded-full -bottom-[12%] left-[5%] bg-[var(--accent-green)]`} />
      </div>

      <div className="container relative z-10 flex max-w-[760px] flex-col items-center gap-6">
        <p className={`${styles.code} m-0 select-none text-center font-normal leading-none`} aria-hidden="true">
          <span className="kinetic-text">Work In Progress</span>
        </p>

        <p className="max-w-[540px] text-center text-[clamp(1rem,2vw,1.15rem)] leading-[var(--leading-relaxed)] text-[var(--on-surface-variant)]">
          This page is under construction. Head back while we finish building it.
        </p>

        <div className="flex flex-wrap gap-3.5 pt-2 max-sm:flex-col max-sm:items-stretch">
          <Link
            href="/"
            className={`${styles.cta} inline-flex min-h-10 items-center justify-center rounded-full px-[1.1rem] py-[0.55rem] font-semibold tracking-[0.02em] no-underline bg-primary-container text-on-primary-container hover:opacity-[0.92] hover:-translate-y-px`}
          >
            Back to Home
          </Link>
          <Link
            href="/contact"
            className={`${styles.cta} inline-flex min-h-10 items-center justify-center rounded-full border border-(--border-subtle) px-[1.1rem] py-[0.55rem] font-semibold tracking-[0.02em] no-underline bg-surface-container text-on-surface hover:bg-surface-high hover:-translate-y-px max-sm:w-full`}
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
