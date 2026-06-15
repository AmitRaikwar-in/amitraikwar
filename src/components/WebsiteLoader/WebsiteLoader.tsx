import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface WebsiteLoaderProps {
  onComplete?: () => void;
}

interface LogItem {
  time: string;
  msg: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseColor: string;
}

export const WebsiteLoader = ({ onComplete }: WebsiteLoaderProps) => {
  const { t } = useTranslation();
  const [progress, setProgress] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [logLines, setLogLines] = useState<LogItem[]>([]);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Coordinate fade-out and cleanup of the index.html preloader
  useEffect(() => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
      preloader.classList.add('preloader-fade-out');
      const timer = setTimeout(() => {
        preloader.remove();
      }, 800);
      return () => clearTimeout(timer);
    }
  }, []);

  // Decrypting matrix text animation state
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    const targetText =
      t('loader.targetText') || 'SYSTEM_ONLINE // LINK_ESTABLISHED';
    const glyphs = 'X%&*?#+ø[]{}01ABC_';

    // How many characters should be fully resolved based on progress (0 to 100)
    const resolvedCount = Math.floor((progress / 100) * targetText.length);

    const getDecrypted = () =>
      targetText
        .split('')
        .map((char, index) => {
          if (index < resolvedCount) {
            return char;
          }
          if (index === resolvedCount && progress < 100) {
            // Blinking cursor/next character transitioning
            return glyphs[Math.floor(Math.random() * glyphs.length)];
          }
          // Random glyph
          return glyphs[Math.floor(Math.random() * glyphs.length)];
        })
        .join('');

    // Synchronously set initial display text for this progress tick
    setDisplayText(getDecrypted());

    if (progress < 100) {
      let iterations = 0;
      const interval = setInterval(() => {
        setDisplayText(getDecrypted());
        iterations++;
        if (iterations > 3) {
          clearInterval(interval);
        }
      }, 40);
      return () => clearInterval(interval);
    }
  }, [progress, t]);

  // Dynamic progress loader logic
  useEffect(() => {
    let active = true;
    let currentProgress = 0;

    const tick = () => {
      if (!active) return;

      // Organic loading simulation curve
      let nextStep = 1;
      let delay = 30;

      if (currentProgress < 30) {
        nextStep = Math.random() * 2 + 1;
        delay = Math.random() * 20 + 20; // 20-40ms
      } else if (currentProgress < 75) {
        nextStep = Math.random() * 1.5 + 0.5;
        delay = Math.random() * 40 + 40; // 40-80ms
      } else if (currentProgress < 95) {
        nextStep = Math.random() * 0.8 + 0.2;
        delay = Math.random() * 80 + 80; // 80-160ms
      } else if (currentProgress < 100) {
        nextStep = 0.5;
        delay = Math.random() * 150 + 150; // 150-300ms
      }

      currentProgress = Math.min(100, currentProgress + nextStep);
      setProgress(currentProgress);

      if (currentProgress < 100) {
        setTimeout(tick, delay);
      } else {
        setTimeout(() => {
          if (active) {
            onComplete?.();
          }
        }, 400);
      }
    };

    const startTimeout = setTimeout(tick, 300);

    return () => {
      active = false;
      clearTimeout(startTimeout);
    };
  }, [onComplete]);

  // Terminal log update logic
  useEffect(() => {
    const formatTime = () => {
      const now = new Date();
      return (
        now.toTimeString().split(' ')[0] +
        '.' +
        String(now.getMilliseconds()).padStart(3, '0')
      );
    };

    const addLog = (msg: string) => {
      setLogLines((prev) => {
        const newLogs = [...prev, { time: formatTime(), msg }];
        if (newLogs.length > 5) {
          return newLogs.slice(newLogs.length - 5);
        }
        return newLogs;
      });
    };

    if (progress === 0 && logLines.length === 0) {
      addLog('SYS_INIT :: COGNITIVE_BOOT_SEQUENCE_START');
    } else if (
      progress > 15 &&
      progress <= 35 &&
      !logLines.some((l) => l.msg.includes('ASSET'))
    ) {
      addLog('ASSET_LOADER :: FETCH_RESOURCES [textures, meshes]');
    } else if (
      progress > 35 &&
      progress <= 55 &&
      !logLines.some((l) => l.msg.includes('PHYSICS'))
    ) {
      addLog('PHYSICS_ENGINE :: CONSTRUCT_RAPIER_COLLIDERS');
    } else if (
      progress > 55 &&
      progress <= 75 &&
      !logLines.some((l) => l.msg.includes('SHADER'))
    ) {
      addLog('RENDER_PIPELINE :: COMPILING_WEBGL_SHADERS');
    } else if (
      progress > 75 &&
      progress <= 90 &&
      !logLines.some((l) => l.msg.includes('INTERFACE'))
    ) {
      addLog('INTERFACE :: INITIALIZING_RIGIDBODY_REFS');
    } else if (
      progress >= 100 &&
      !logLines.some((l) => l.msg.includes('BOOT_SUCCESS'))
    ) {
      addLog('SYSTEM_BOOT :: SUCCESSFUL_ENTRY_POINT_RESOLVED');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress]);

  // Interactive Particle Swarm Canvas Logic
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles: Particle[] = [];
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,
        size: Math.random() * 2 + 1,
        baseColor:
          Math.random() > 0.5 ? 'rgba(138, 43, 226, ' : 'rgba(6, 182, 212, ',
      });
    }

    const localMouse = { x: width / 2, y: height / 2, active: false };

    const handleMouseMove = (e: MouseEvent) => {
      localMouse.x = e.clientX;
      localMouse.y = e.clientY;
      localMouse.active = true;
      setMousePos({ x: Math.round(e.clientX), y: Math.round(e.clientY) });
    };

    const handleMouseLeave = () => {
      localMouse.active = false;
    };

    const handleClick = (e: MouseEvent) => {
      const burstCount = 10;
      for (let i = 0; i < burstCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 2.5 + 1;
        particles.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 2 + 1,
          baseColor:
            Math.random() > 0.5 ? 'rgba(138, 43, 226, ' : 'rgba(6, 182, 212, ',
        });
      }
      if (particles.length > 100) {
        particles.splice(0, particles.length - 100);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('click', handleClick);

    const render = () => {
      ctx.fillStyle = 'rgba(7, 5, 9, 0.25)';
      ctx.fillRect(0, 0, width, height);

      // Draw particle connections (neural-net constellation layout)
      ctx.beginPath();
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            const alpha = (1 - dist / 100) * 0.1;
            ctx.strokeStyle = `rgba(138, 43, 226, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
          }
        }
      }
      ctx.stroke();

      // Update and draw particles
      particles.forEach((p) => {
        if (localMouse.active) {
          const dx = localMouse.x - p.x;
          const dy = localMouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 200) {
            const force = (200 - dist) / 3000;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
        }

        p.vx *= 0.98;
        p.vy *= 0.98;

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        else if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        else if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.baseColor + '0.5)';
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Determine current subtitle based on progress
  let currentSubtitle = t('loader.developer') || 'DEVELOPER';
  if (progress > 70) {
    currentSubtitle = t('loader.creator') || 'CREATOR';
  } else if (progress > 35) {
    currentSubtitle = t('loader.designer') || 'DESIGNER';
  }

  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{ y: '-100%' }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 bg-[#070509] z-[99999] flex flex-col items-center justify-center overflow-hidden"
      data-testid="website-loader-container"
    >
      {/* Interactive canvas taking background layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block cursor-crosshair z-0"
      />

      {/* Futuristic Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.007)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.007)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-1" />

      {/* Main HUD overlay */}
      <div className="flex flex-col items-center justify-center z-10 relative pointer-events-none select-none px-6">
        {/* Decrypting Matrix Title with neon shadow */}
        <div className="mb-8 min-h-[48px] flex items-center justify-center max-w-lg">
          <span
            className="font-mono text-xl md:text-3xl font-extrabold text-white tracking-widest text-center"
            style={{
              textShadow:
                '0 0 10px rgba(138, 43, 226, 0.4), 0 0 20px rgba(6, 182, 212, 0.2)',
            }}
          >
            {displayText}
          </span>
        </div>

        {/* Circular HUD Loader */}
        <div className="relative flex items-center justify-center w-48 h-48 md:w-56 md:h-56">
          {/* Rotating dashed ring */}
          <motion.svg
            className="w-full h-full absolute"
            viewBox="0 0 100 100"
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          >
            <circle
              cx="50"
              cy="50"
              r="44"
              stroke="rgba(138, 43, 226, 0.1)"
              strokeWidth="1"
              fill="transparent"
            />
            <circle
              cx="50"
              cy="50"
              r="44"
              stroke="url(#hud-glow)"
              strokeWidth="2.5"
              fill="transparent"
              strokeDasharray="25 15 5 15 45 15"
            />
            <defs>
              <linearGradient id="hud-glow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8A2BE2" />
                <stop offset="50%" stopColor="#d946ef" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
          </motion.svg>

          {/* Innermost pulsing ring */}
          <motion.div
            className="absolute w-36 h-36 border border-cyan-500/20 rounded-full"
            animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Readout Counter */}
          <div className="flex flex-col items-center justify-center z-10">
            <span className="font-mono text-3xl md:text-4xl font-extrabold text-white tracking-widest">
              {Math.floor(progress)}%
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-cyan-400 mt-1 font-bold">
              SYS_BOOT_STABLE
            </span>
          </div>
        </div>

        {/* Linear neon progress bar */}
        <div className="w-64 h-[3px] bg-white/5 rounded-full overflow-hidden relative mb-4 mt-8">
          <motion.div
            className="h-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Dynamic cycling subtitle */}
        <div className="h-6 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSubtitle}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 0.6, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className="font-mono text-[10px] text-white tracking-[0.4em] uppercase font-bold text-center"
            >
              {currentSubtitle}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* HUD System Boot Logs (Bottom-Left) */}
      <div className="absolute bottom-6 left-6 font-mono text-[9px] text-violet-400/40 text-left max-w-[280px] pointer-events-none select-none space-y-1 hidden md:block z-10">
        {logLines.map((line, idx) => (
          <div key={idx} className="flex gap-2 items-center">
            <span className="text-cyan-400/40">[{line.time}]</span>
            <span className="uppercase">{line.msg}</span>
          </div>
        ))}
      </div>

      {/* Real-time coordinate tracker (Bottom-Right) */}
      <div className="absolute bottom-6 right-6 font-mono text-[9px] text-cyan-400/40 text-right pointer-events-none select-none hidden md:block z-10">
        {`LOC::[X_${String(mousePos.x).padStart(4, '0')} // Y_${String(mousePos.y).padStart(4, '0')}] // DEV_PORTFOLIO_VER_0.21.1`}
      </div>
    </motion.div>
  );
};
