
import { useState } from "react";
import profileImg from "../assets/profileImage.jpeg"

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
    { name: "About", href: "#about" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50">
      <div className="mx-auto max-w-7xl px-6 py-0">
        {/* NAV BAR */}
        <div
          className="
            flex items-center justify-between
            rounded-2xl
            border border-white/10
            bg-white/5
            backdrop-blur-xl
            shadow-lg
            px-6 py-3
          "
        >
          {/* LOGO */}
          <div className="text-white font-bold text-xl tracking-wide flex items-center gap-2">
            <img src={profileImg} alt="Profile" className="w-10 h-10 rounded-full object-cover" />
            Dip Bag<span className="text-cyan-400">.</span>
          </div>

          {/* DESKTOP */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="
                    text-white/80
                    hover:text-cyan-400
                    transition-all
                    duration-300
                    relative
                    after:absolute
                    after:left-0
                    after:-bottom-1
                    after:h-[2px]
                    after:w-0
                    after:bg-cyan-400
                    after:transition-all
                    after:duration-300
                    hover:after:w-full
                  "
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden text-white z-50 relative cursor-pointer focus:outline-none"
          >
            <div className="space-y-1">
              <span
                className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
                  open ? "rotate-45 translate-y-1.5" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
                  open ? "-rotate-45 -translate-y-1.5" : ""
                }`}
              />
            </div>
          </button>
        </div>

        {/* MOBILE MENU (animated & liquid glass) */}
        <div
          className={`
            md:hidden
            mt-4
            overflow-hidden
            rounded-2xl
            border border-white/10
            backdrop-blur-2xl
            bg-gradient-to-br from-white/10 to-white/5
            shadow-xl
            transition-all duration-500 ease-out
            ${open
              ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
              : "opacity-0 scale-95 -translate-y-4 pointer-events-none"}
          `}
        >
          <ul className="flex flex-col gap-5 px-6 py-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="
                    block
                    text-white/80
                    hover:text-cyan-400
                    transition-colors
                    duration-300
                    text-lg
                  "
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
