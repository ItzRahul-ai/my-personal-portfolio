import { useEffect, useRef } from "react";

export default function Antigravity() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999, moving: false });
  const scrollYRef = useRef(0);
  const vortexRef = useRef(null);
  const revealRadiusRef = useRef(180);
  const idleFramesRef = useRef(0);
  const particlesRef = useRef([]);
  const hueRef = useRef(210);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    const isMobile = window.innerWidth < 768;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Reinitialize particles on resize
      initParticles();
    };

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = [];
      const GAP = isMobile ? 46 : 32;

      for (let y = 0; y < canvas.height; y += GAP) {
        for (let x = 0; x < canvas.width; x += GAP) {
          particlesRef.current.push({
            ox: x,
            oy: y,
            x,
            y,
            vx: 0,
            vy: 0,
            angle: Math.random() * Math.PI * 2,
          });
        }
      }
    };

    setCanvasSize();

    // Event handlers
    const handleMove = (e) => {
      const p = e.touches ? e.touches[0] : e;
      mouseRef.current.x = p.clientX;
      mouseRef.current.y = p.clientY;
      mouseRef.current.moving = true;
      idleFramesRef.current = 0;
      revealRadiusRef.current = 220;
    };

    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
    };

    const handleClick = (e) => {
      vortexRef.current = {
        x: e.clientX,
        y: e.clientY,
        strength: 1,
      };
      revealRadiusRef.current = 320;
    };

    // Animation loop
    const animate = () => {
      // Clear canvas with solid background
      ctx.fillStyle = "#05070f";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      hueRef.current += 0.5;
      if (hueRef.current > 360) hueRef.current = 0;
      
      revealRadiusRef.current *= 0.965;

      const particles = particlesRef.current;
      const mouse = mouseRef.current;
      const vortex = vortexRef.current;
      const revealRadius = revealRadiusRef.current;
      const hue = hueRef.current;

      particles.forEach((p) => {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.hypot(dx, dy);

        if (dist > revealRadius) return;

        // FOLLOW - close to cursor
        if (dist < 60) {
          const follow = (60 - dist) * 0.002;
          p.vx += dx * follow;
          p.vy += dy * follow;
        }

        // ORBIT - medium distance
        if (dist >= 60 && dist < 170) {
          p.angle += 0.1;
          p.vx += Math.cos(p.angle) * 0.35;
          p.vy += Math.sin(p.angle) * 0.35;
        }

        // VORTEX - click effect
        if (vortex) {
          const vdx = vortex.x - p.x;
          const vdy = vortex.y - p.y;
          const vd = Math.hypot(vdx, vdy) + 0.001;
          const spin = vortex.strength * 1.1;

          p.vx += (-vdy / vd) * spin;
          p.vy += (vdx / vd) * spin;

          p.vx += vdx * 0.0025 * vortex.strength;
          p.vy += vdy * 0.0025 * vortex.strength;
        }

        // RESTORE to original position
        p.vx += (p.ox - p.x) * 0.0025;
        p.vy += (p.oy - p.y) * 0.0025;
        p.vy += Math.sin(scrollYRef.current * 0.002 + p.ox) * 0.02;

        // Friction
        p.vx *= 0.82;
        p.vy *= 0.82;

        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Calculate visual properties
        const alpha = Math.max(0, 1 - dist / revealRadius);
        const size = dist < 50 ? 2.4 : dist < 100 ? 1.6 : 1;

        // Draw with glow
        if (dist < 80) {
          ctx.shadowBlur = 26;
          ctx.shadowColor = `hsla(${hue}, 100%, 65%, ${alpha})`;
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.fillStyle = `hsla(${hue}, 100%, 65%, ${alpha})`;
        ctx.fillRect(p.x - size / 2, p.y - size / 2, size, size);
      });

      // Update vortex
      if (vortex) {
        vortex.strength *= 0.92;
        if (vortex.strength < 0.02) {
          vortexRef.current = null;
        }
      }

      // Update idle state
      if (!mouse.moving) {
        idleFramesRef.current++;
      }
      mouse.moving = false;

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    animate();

    // Add event listeners
    window.addEventListener("resize", setCanvasSize);
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("touchmove", handleMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    canvas.addEventListener("click", handleClick);

    // Cleanup
    return () => {
      window.removeEventListener("resize", setCanvasSize);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("scroll", handleScroll);
      canvas.removeEventListener("click", handleClick);
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

 return (
  <canvas
    ref={canvasRef}
    style={{
      position: "fixed",
      inset: 0,
      width: "100%",
      height: "100%",
      background: "#05070f",
      zIndex: 0,
      pointerEvents: "none", // 🔥 VERY IMPORTANT
    }}
  />
);

}