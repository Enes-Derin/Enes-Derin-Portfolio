/* AlgorixaLogo.jsx
   Gerçek Algorixa "A" mark'ı — altın gradient + neon glow opsiyonu
   Navbar ve Footer'da kullanım: <AlgorixaLogo size={28} glow />
*/
export default function AlgorixaLogo({ size = 32, glow = false }) {
    const gradId = "algGold";
    const glowId = "algGlow";
    const glowId2 = "algGlow2";

    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                {/* Altın gradient — gerçek logo renkleri */}
                <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f6e1a3" />
                    <stop offset="40%" stopColor="#d7aa45" />
                    <stop offset="70%" stopColor="#b8862e" />
                    <stop offset="100%" stopColor="#6f4f16" />
                </linearGradient>

                {/* Glow filtresi — sadece glow=true iken aktif */}
                {glow && (
                    <>
                        <filter id={glowId} x="-40%" y="-40%" width="180%" height="180%">
                            <feGaussianBlur stdDeviation="4" result="blur" />
                            <feMerge>
                                <feMergeNode in="blur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                        <filter id={glowId2} x="-60%" y="-60%" width="220%" height="220%">
                            <feGaussianBlur stdDeviation="8" result="blur2" />
                            <feMerge>
                                <feMergeNode in="blur2" />
                            </feMerge>
                        </filter>
                    </>
                )}
            </defs>

            {/* ── Dış glow halo (sadece glow=true) ── */}
            {glow && (
                <path
                    d="M20 105 L60 15 L100 105 L85 105 L73 75 L47 75 L35 105 Z"
                    fill="rgba(215,170,69,.35)"
                    filter={`url(#${glowId2})`}
                />
            )}

            {/* ── Ana A harfi ── */}
            <path
                d="M20 105 L60 15 L100 105 L85 105 L73 75 L47 75 L35 105 Z"
                fill={`url(#${gradId})`}
                filter={glow ? `url(#${glowId})` : undefined}
            />

            {/* ── Orta yatay çizgi (crossbar) ── */}
            <rect
                x="47" y="68"
                width="26" height="8"
                rx="1"
                fill={`url(#${gradId})`}
                filter={glow ? `url(#${glowId})` : undefined}
            />
        </svg>
    );
}