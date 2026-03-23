import AlgorixaLogo from "./AlgorixaLogo"

export default function Footer() {
    const year = new Date().getFullYear()
    return (
        <footer className="footer">
            <div className="fl">
                {/* <AlgorixaLogo size={20} glow /> */}
                <span className="fl-txt">ENES DERIN</span>
            </div>

            <span className="fc">© {year} — All rights reserved</span>

            <a
                href="https://algorixa.com.tr"
                target="_blank" rel="noreferrer"
                className="fa"
            >
                ALGORIXA ↗
            </a>
        </footer >
    )
}