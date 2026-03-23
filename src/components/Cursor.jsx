import { useEffect } from "react"

export default function Cursor() {
    useEffect(() => {
        const c = document.getElementById("cur")
        const d = document.getElementById("cur-dot")
        if (!c || !d) return

        let mx = 0, my = 0, cx = 0, cy = 0, raf
        const mv = e => { mx = e.clientX; my = e.clientY; d.style.left = mx + "px"; d.style.top = my + "px" }
        const lr = (a, b, t) => a + (b - a) * t
        const tick = () => { cx = lr(cx, mx, .11); cy = lr(cy, my, .11); c.style.left = cx + "px"; c.style.top = cy + "px"; raf = requestAnimationFrame(tick) }

        const on = () => c.classList.add("h")
        const off = () => c.classList.remove("h")

        window.addEventListener("mousemove", mv)
        raf = requestAnimationFrame(tick)

        const bind = () => document.querySelectorAll("a,button,[data-h]").forEach(el => { el.addEventListener("mouseenter", on); el.addEventListener("mouseleave", off) })
        bind()

        const obs = new MutationObserver(bind)
        obs.observe(document.body, { childList: true, subtree: true })

        return () => { window.removeEventListener("mousemove", mv); cancelAnimationFrame(raf); obs.disconnect() }
    }, [])

    return <><div id="cur" /><div id="cur-dot" /></>
}