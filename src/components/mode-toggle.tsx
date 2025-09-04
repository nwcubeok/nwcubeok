"use client"

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { motion as m } from "framer-motion";

import { Button } from "@/components/ui/button";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler"; // ⚠️ ajuste le chemin si besoin

const raysVarriants = {
  hidden: {
    strokeOpacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    }
  },
  visible: {
    strokeOpacity: 1,
    transition: {
      staggerChildren: 0.06,
    }
  }
};

const rayVarriant = {
  hidden: {
    pathLength: 0,
    opacity: 0,
    scale: 0
  },
  visible: {
    pathLength: 1,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      pathLength: { duration: 0.8 },
      opacity: { duration: 0.5 },
      scale: { duration: 0 }
    }
  }
};

const shineVariant = {
  hidden: {
    opacity: 0,
    scale: 2,
    strokeDasharray: "20, 1000",
    strokeDashoffset: 0,
    filter: "blur(0px)",
  },
  visible: {
    opacity: [0, 1, 0],
    strokeDashoffset: [0, -50, -100],
    filter: ["blur(2px)", "blur(2px)", "blur(0px)"],
    transition: {
      duration: 0.75,
      ease: 'linear'
    },
  },
};

export default function ModeToggle() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const sunPath = "M34.5 49C42.5081 49 49 42.5081 49 34.5C49 26.4919 42.5081 20 34.5 20C26.4919 20 20 26.4919 20 34.5C20 42.5081 26.4919 49 34.5 49Z";
  const moonPath = "M34.5 49C42.5081 49 49 42.5081 49 34.5C36.4935 39.9755 29.1633 34.1245 34.5 20C26.4919 20 20 26.4919 20 34.5C20 42.5081 26.4919 49 34.5 49Z";

  if (!mounted) return null;

  return (
    <AnimatedThemeToggler>
      {(isDark, toggleTheme, buttonRef) => (
        <Button
          ref={buttonRef}
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="border bg-background transition-all duration-200 md:hover:scale-110 hover:cursor-pointer rounded-full"
        >
          <m.svg width="69" height="69" viewBox="0 0 69 69" fill="none" xmlns="http://www.w3.org/2000/svg" className='relative'>
            {/* shine path */}
            <m.path
              variants={shineVariant}
              d={moonPath}
              className="absolute top-0 left-0 stroke-blue-100 mix-blend-exclusion"
              initial="hidden"
              animate={isDark ? "visible" : "hidden"}
            />
            {/* moon/sun shape */}
            <m.path
              d={isDark ? moonPath : sunPath}
              fill="transparent"
              className="stroke-blue-100 mix-blend-exclusion"
              transition={{ duration: 1, type: "spring" }}
              initial={{ fillOpacity: 0, strokeOpacity: 0 }}
              animate={{
                rotate: isDark ? 360 : 0,
                fill: isDark ? "transparent" : "black",
                strokeWidth: isDark ? 3 : 6,
                strokeOpacity: 1,
                scale: isDark ? 2 : 1,
                transition: { delay: 0.1 },
              }}
            />
            {/* rays (sun only) */}
            <m.g
              variants={raysVarriants}
              initial="visible"
              animate={isDark ? "hidden" : "visible"}
              className="stroke-8 stroke-blue-100 mix-blend-exclusion"
            >
              <m.path variants={rayVarriant} d="M34.5 1.875V5.5" />
              <m.path variants={rayVarriant} d="M57.5695 11.4305L55.0066 13.9934" />
              <m.path variants={rayVarriant} d="M63.5 34.5H67.125" />
              <m.path variants={rayVarriant} d="M55.0066 55.0066L57.5695 57.5695" />
              <m.path variants={rayVarriant} d="M34.5 63.5V67.125" />
              <m.path variants={rayVarriant} d="M13.9934 55.0066L11.4305 57.5695" />
              <m.path variants={rayVarriant} d="M1.875 34.5H5.5" />
              <m.path variants={rayVarriant} d="M11.4305 11.4305L13.9934 13.9934" />
            </m.g>
          </m.svg>
          <span className="sr-only">Toggle theme</span>
        </Button>
      )}
    </AnimatedThemeToggler>
  );
}

export { ModeToggle };
