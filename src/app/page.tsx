"use client";
import React, { useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

import Navbar from "@/components/navbar";
import Hero from "@/sections/Hero";
import Projects from "@/sections/Projects";

export default function Home() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rawScrollX = useMotionValue(0); // Gérer le défilement horizontal brut
  const smoothScrollX = useSpring(rawScrollX, {
    stiffness: 100, // Ajustez la rigidité pour un effet plus ou moins réactif
    damping: 27, // Ajustez l'amortissement pour un mouvement plus ou moins fluide
  });

  // Fonction pour mettre à jour la position en fonction de la section
  const updateScrollPosition = (href: string) => {
    const sectionWidth = window.innerWidth;

    if (href === "#home") {
      rawScrollX.set(0); // Aller à Hero
    } else if (href === "#projects") {
      rawScrollX.set(-sectionWidth); // Aller à Projects
    }
  };

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    // Calculer les limites de défilement
    const sectionWidth = window.innerWidth;
    const maxScroll = -(sectionWidth * (2 - 1));

    const onWheel = (event: WheelEvent) => {
      event.preventDefault(); // Empêcher le défilement vertical natif
      const currentValue = rawScrollX.get();
      let nextValue = currentValue - event.deltaY;

      // Gestion des limites
      if (event.deltaY > 0) {
        if (currentValue > maxScroll) {
          nextValue = Math.max(nextValue, maxScroll);
          rawScrollX.set(nextValue);
        }
      } else if (event.deltaY < 0) {
        if (currentValue < 0) {
          nextValue = Math.min(nextValue, 0);
          rawScrollX.set(nextValue);
        }
      }
    };

    // Ajouter l'écouteur d'événement
    container.addEventListener("wheel", onWheel, { passive: false });

    // Nettoyer l'écouteur lors du démontage
    return () => {
      container.removeEventListener("wheel", onWheel);
    };
  }, [rawScrollX]);

  return (
    <>
      <Navbar updateScrollPosition={updateScrollPosition} />
      <motion.div
        ref={containerRef}
        className="flex h-screen w-max flex-row overflow-hidden snap-mandatory"
        style={{
          x: smoothScrollX,
        }}
      >
        <Hero />
        <Projects />
      </motion.div>
    </>
  );
}
