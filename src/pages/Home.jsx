import { useEffect, useRef } from "react";
import Typewriter from "typewriter-effect";

const Home = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const el = heroRef.current;

    const onMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 30;
      const y = (e.clientY / innerHeight - 0.5) * 30;

      el.style.transform = `
        rotateX(${-y}deg)
        rotateY(${x}deg)
        translateZ(20px)
      `;
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const text = ["Dip", "Developer", "Designer"];

  return (
    <section
      id="home"
      className="card relative min-h-screen w-screen flex items-center justify-center overflow-hidden px-6"
    >
      {/* Glow orb */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/20 blur-[140px]" />
      </div>

      {/* HERO CONTENT */}
      <div
        ref={heroRef}
        className="
          relative z-10
          flex flex-col items-center text-center
          transition-transform duration-300 ease-out
          will-change-transform
        "
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Floating badge */}
        <div className="mb-6 rounded-full border border-white/20 bg-white/5 backdrop-blur-xl px-6 py-2 text-sm text-cyan-300 shadow-lg animate-pulse">
          🚀 Creative Frontend Developer
        </div>

        {/* Main heading */}
        <h1
          className="
            text-5xl md:text-7xl pb-5 font-extrabold
            bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500
            bg-clip-text text-transparent
            drop-shadow-[0_0_40px_rgba(34,211,238,0.35)]
          "
        >Hey I'm
        <Typewriter
            options={{
              strings: text,
              autoStart: true,
              loop: true,
              deleteSpeed: 50,
            }} />
        </h1>

        {/* Sub text */}
        <p className="mt-6 max-w-xl text-lg text-white/70 leading-relaxed">
          I craft immersive, high-performance web experiences with modern
          frontend technologies, smooth animations & futuristic UI.
        </p>

        {/* CTA buttons */}
        <div className="mt-10 flex gap-6">
          <a
            href="#projects"
            className="
              rounded-xl px-7 py-3
              bg-cyan-500 text-black font-semibold
              shadow-[0_0_30px_rgba(34,211,238,0.5)]
              hover:scale-105 transition-transform
            "
          >
            View Projects
          </a>

          <a
            href="#contact"
            className="
              rounded-xl px-7 py-3
              border border-white/20
              bg-white/5 backdrop-blur-xl
              text-white
              hover:bg-white/10
              transition-all
            "
          >
            Contact Me
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 flex flex-col items-center text-white/50">
        <span className="text-sm mb-2">Scroll</span>
        <div className="h-10 w-[2px] bg-gradient-to-b from-cyan-400 to-transparent animate-pulse" />
      </div>
    </section>
  );
};

export default Home;
