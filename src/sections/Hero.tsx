"use client"

import React from "react"; 
import { TextAnimate } from "@/components/ui/text-animate";
import { LineShadowText } from "@/components/ui/line-shadow-text";
import { cn } from "@/lib/utils";
import {InteractiveGridPattern} from "@/components/ui/interactive-grid-pattern";
import { useTheme } from "next-themes";

const Hero = () => {
  const theme = useTheme();
  const shadowColor = theme.resolvedTheme === "dark" ? "white" : "black";
  return (
    <section 
      id="home" 
      className="flex-shrink-0 h-screen w-screen relative flex flex-col items-center justify-center overflow-hidden"
    >
      <TextAnimate 
      animation="slideLeft" 
      by="character" 
      as="h1" 
      className={cn(
        "z-10 text-balance whitespace-pre-wrap font-gasoekone text-6xl text-[#11090f] dark:text-[#f1e8e6]",
        "pointer-events-none user-select-none"
      )}>
      
        <LineShadowText shadowColor={shadowColor}>
        nwcubeok
        </LineShadowText>
      </TextAnimate>
      <div className="absolute flex flex-row items-center justify-center w-full h-screen">
        <InteractiveGridPattern
          width={41}
          height={37}
          squares={[50, 50]}
          className={cn(
            "[mask-image:radial-gradient(430px_circle_at_left,white,transparent)]",
            "skew-y-6 transform translate-x-1/2"
          )}
        />
        <InteractiveGridPattern
          width={40.55}
          height={37}
          squares={[50, 50]}
          className={cn(
            "[mask-image:radial-gradient(430px_circle_at_right,white,transparent)]",
            "-skew-y-6 transform -translate-x-1/2"
          )}
        />
      </div>
    </section>
  );
}

export default Hero;
