// import React, { useState } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
// import Home from "./pages/Home";
// import About from "./pages/About";
// import Projects from "./pages/Projects";
// import Skills from "./pages/Skills";
// import Contact from "./pages/Contact";
// import Nav from "./components/Nav";


// export default function App() {
//   const [darkMode, setDarkMode] = useState(false);


//   const toggleTheme = () => setDarkMode(!darkMode);


//   return (
//     <Router>
//       <div className={`${darkMode ? 'bg-dark text-light' : 'bg-light text-dark'} min-vh-100 font-sans transition-theme`}>
//         <Nav darkMode={darkMode} toggleTheme={toggleTheme} />
//         <AnimatePresence mode="wait">
//           <Routes>
//             <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
//             <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
//             <Route path="/projects" element={<PageWrapper><Projects /></PageWrapper>} />
//             <Route path="/skills" element={<PageWrapper><Skills /></PageWrapper>} />
//             <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
//           </Routes>
//         </AnimatePresence>
//       </div>
//     </Router>
//   );
// }


// function PageWrapper({ children }) {
//   const { scrollY } = useScroll();
//   const yTransform = useTransform(scrollY, [0, 500], [0, -50]);


//   return (
//     <motion.div
//       style={{ y: yTransform }}
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: -20 }}
//       transition={{ duration: 0.5 }}
//     >
//       {children}
//     </motion.div>
//   );
// }
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import LoginPage from "./admin/LoginPage";
import AdminPage from "./admin/AdminPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />

        {/* Auth */}
        <Route path="/login" element={<LoginPage />} />

        {/* Admin */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
