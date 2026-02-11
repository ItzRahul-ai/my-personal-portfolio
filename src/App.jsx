import React from "react";
import Antigravity from "./components/Antigravity";
import Home from "./pages/Home";
import Skills from "./pages/Skills";
import Projects from "./pages/Projects";
import Experience from "./pages/Experience";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Nav from "./components/Nav";


import { motion } from "framer-motion";

const App = () => {


  return (
    <motion.div
      className="relative min-h-screen overscroll-y-scroll scroll-smooth overflow-x-hidden"
      style={{ scrollSnapType: "y mandatory" }}
    >
      {/* Background animation */}
      <Antigravity />

      {/* Foreground content */}
      <div className="relative z-10 text-white w-screen max-h-screen">

        <Nav></Nav>

        {/* allpage import container */}
        <div className=" w-screen snap-container h-screen overflow-x-hidden">

          {/* import home */}
          <Home></Home>

          {/* import skills */}
          <Skills></Skills>

          {/* import exparience */}
          <Experience></Experience>

          {/* import projects */}
          <Projects></Projects>

          {/* import contact */}
          <Contact></Contact>

          {/* import about */}
          <About></About>

        </div>
      </div>
    </motion.div>
  );
};

export default App;
