"use client"

import React, { useState, useEffect } from "react"; 
import { TextAnimate } from "@/components/ui/text-animate";
import { LineShadowText } from "@/components/ui/line-shadow-text";
import { cn } from "@/lib/utils";
import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern";
import { useTheme } from "next-themes";

const Hero = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ne pas rendre le composant tant que le thème n'est pas chargé
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const name = "nwcubeok";
  const shadowColor = resolvedTheme === "dark" ? "white" : "black";

  return (
    <section className="h-screen w-screen">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex text-balance whitespace-pre-wrap font-jersey md:text-9xl text-7xl text-primary">
          {name.split("").map((char, index) => (
            <TextAnimate
              key={index}
              animation="slideLeft"
              as="h1"
              delay={index * 0.08}
              className={cn(
              )}
            >
              <span key={index} className="transition-transform hover:scale-110">
                <LineShadowText shadowColor={shadowColor}>
                  {char}
                </LineShadowText>
              </span>
            </TextAnimate>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
