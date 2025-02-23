"use client"

import React from "react"; 
import { TextAnimate } from "@/components/ui/text-animate";
import { LineShadowText } from "@/components/ui/line-shadow-text";
import { cn } from "@/lib/utils";
import {InteractiveGridPattern} from "@/components/ui/interactive-grid-pattern";
import { useTheme } from "next-themes";

const Hero = () => {
  const theme = useTheme();
  const name = "nwcubeok";

  const shadowColor = theme.resolvedTheme === "dark" ? "white" : "black";
  return (
    <section 
      className="h-screen w-screen pointer-events-none"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
      <p className="text-3xl font-jersey">
        nwcubeok2
      </p>
    <TextAnimate
      animation="slideLeft"
      by="character"
      as="h1"
      className={cn(
        "text-balance whitespace-pre-wrap font-jersey text-8xl text-[#11090f] dark:text-[#f1e8e6]",
      )}
    >
      {name.split("").map((char, index) => (
        <span
          key={index}
          className="transition-transform hover:scale-110"
        >
          <LineShadowText shadowColor={shadowColor}>
            {char}
          </LineShadowText>
        </span>
      ))}
    </TextAnimate>
  </div>
    </section>
  );
}

export default Hero;
