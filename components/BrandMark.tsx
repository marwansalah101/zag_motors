/** Transparent vector reconstruction of the supplied angular ZAG monogram. */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 50 44" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M2 1h32l-6 7H14l8 11-5 8L2 1Z" />
      <path d="M26 8h8L8 43H0L26 8Z" />
      <path d="M42 1h8L23 36h20l7 7H14L42 1Z" />
    </svg>
  );
}
