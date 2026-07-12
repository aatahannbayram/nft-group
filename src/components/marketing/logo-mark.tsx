export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <rect width="100" height="100" rx="24" fill="#002D56" />
      <path
        d="M30 74V26H41.5L60 58.5V26H70V74H58.5L40 41.5V74H30Z"
        fill="#ffffff"
      />
      <rect x="30" y="80" width="18" height="5" rx="2.5" fill="#ED1C24" />
      <rect x="52" y="80" width="18" height="5" rx="2.5" fill="#ED1C24" />
    </svg>
  );
}
