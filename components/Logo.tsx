export default function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Custom bear market icon - downward trending geometric design */}
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        {/* Geometric bear head */}
        <path
          d="M16 4L12 8L8 12L12 16L16 20L20 16L24 12L20 8L16 4Z"
          fill="url(#bear-gradient)"
          opacity="0.2"
        />
        {/* Downward trend line */}
        <path
          d="M6 10L12 16L18 12L24 18L28 22"
          stroke="url(#line-gradient)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Down arrow */}
        <path
          d="M26 20L28 22L26 24"
          stroke="url(#arrow-gradient)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <defs>
          <linearGradient id="bear-gradient" x1="8" y1="4" x2="24" y2="20" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ff6b2c" />
            <stop offset="1" stopColor="#dc2626" />
          </linearGradient>
          <linearGradient id="line-gradient" x1="6" y1="10" x2="28" y2="22" gradientUnits="userSpaceOnUse">
            <stop stopColor="#00d4ff" />
            <stop offset="1" stopColor="#0ea5e9" />
          </linearGradient>
          <linearGradient id="arrow-gradient" x1="26" y1="20" x2="28" y2="24" gradientUnits="userSpaceOnUse">
            <stop stopColor="#00d4ff" />
            <stop offset="1" stopColor="#0ea5e9" />
          </linearGradient>
        </defs>
      </svg>
      <span className="text-2xl font-bold tracking-tight">
        Permabear
      </span>
    </div>
  );
}
