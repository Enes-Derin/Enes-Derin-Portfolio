import { BrowserRouter, Routes, Route } from "react-router-dom"
import Cursor from "./components/Cursor"
import Home from "./pages/Home"
import LoginPage from "./admin/LoginPage"
import AdminPage from "./admin/AdminPage"
import ProtectedRoute from "./components/ProtectedRoute"
import { useEffect } from "react"

export default function App() {

  /* App.jsx veya index.js içinde */
  useEffect(() => {
    const isTouch = window.matchMedia("(hover: none)").matches
    if (isTouch) {
      document.body.style.cursor = "auto"
      const cur = document.getElementById("cur")
      const dot = document.getElementById("cur-dot")
      if (cur) cur.style.display = "none"
      if (dot) dot.style.display = "none"
      return
    }

    const cur = document.getElementById("cur")
    const dot = document.getElementById("cur-dot")
    if (!cur || !dot) return

    let mx = 0, my = 0
    const move = e => {
      mx = e.clientX; my = e.clientY
      dot.style.left = mx + "px"
      dot.style.top = my + "px"
      cur.style.left = mx + "px"
      cur.style.top = my + "px"
    }

    /* Hover state — interaktif elemanlarda büyüsün */
    const INTERACTIVE = "a,button,[role=button],.sk-card,.afr,.ct-s,.adm-tab"
    const over = e => { if (e.target.closest(INTERACTIVE)) cur.classList.add("h") }
    const out = e => { if (e.target.closest(INTERACTIVE)) cur.classList.remove("h") }
    const down = () => cur.classList.add("click")
    const up = () => cur.classList.remove("click")

    window.addEventListener("mousemove", move, { passive: true })
    document.addEventListener("mouseover", over)
    document.addEventListener("mouseout", out)
    document.addEventListener("mousedown", down)
    document.addEventListener("mouseup", up)

    return () => {
      window.removeEventListener("mousemove", move)
      document.removeEventListener("mouseover", over)
      document.removeEventListener("mouseout", out)
      document.removeEventListener("mousedown", down)
      document.removeEventListener("mouseup", up)
    }
  }, [])
  return (
    <BrowserRouter>
      <Cursor />
      <div className="scan" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<ProtectedRoute><AdminPage /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  )
}