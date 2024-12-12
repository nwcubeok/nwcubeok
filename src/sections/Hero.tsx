"use client"

import { useState, useEffect } from "react";
import TypingAnimation from "@/components/ui/typing-animation"; 

const Hero = () => {
  const texts = ["newcube", "nwcubeok", "nwcubeop", "newcubeop"];

  const [displayText, setDisplayText] = useState(() => {
    const randomText = texts[Math.floor(Math.random() * texts.length)];
    return randomText;
  });


  return (
    <section id="home" className="min-h-[86vh] flex items-center justify-center">
      <TypingAnimation
        className="font-gasoekone text-6xl"
        text={"nwcubeok"}
        duration={140}
      />
    </section>
  );
}

export default Hero;
