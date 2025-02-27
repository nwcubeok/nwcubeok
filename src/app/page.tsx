"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollToPlugin from "gsap/ScrollToPlugin";

import PageOverlay from "@/components/page-overlay";
import Navbar from "@/components/navbar";
import Hero from "@/sections/Hero";
import Projects from "@/sections/Projects";
import Other from "@/sections/Other";

export default function Home() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  let maxWidth: number;

  // Fonction de navigation vers une section spécifique
  const updateScrollPosition = (href: string) => {
    const sectionWidth = window.innerWidth;
    let targetX = 0;

    if (href === "#home") targetX = 0;
    else if (href === "#projects") targetX = -sectionWidth;

    const targetY =
      (Math.abs(targetX) / (maxWidth - window.innerWidth)) * maxWidth;
    console.log("Scrolling to X:", targetX);
    console.log("Scrolling to Y:", targetY);

    // Si on se trouve déjà sur la section, on ne fait rien
    if (window.scrollY === targetY) return;
    else {
      // Désactive le scroll en cachant le débordement du body
      document.body.style.overflow = "hidden";
      gsap.to(window, {
        scrollTo: { y: targetY },
        duration: 1.2,
        ease: "power2.out",
        onComplete: () => {
          // Réactive le scroll une fois l'animation terminée
          document.body.style.overflow = "";
        },
      });
    }
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    // Sélectionne les éléments <section>
    const sections = gsap.utils.toArray<HTMLElement>("section");

    // Calcule la largeur totale des sections (horizontalement)
    const getMaxWidth = () => {
      maxWidth = 0;
      sections.forEach((section) => {
        maxWidth += section.offsetWidth;
      });
      console.log("Largeur totale :", maxWidth);
    };

    setTimeout(() => {
      getMaxWidth();
      ScrollTrigger.addEventListener("refreshInit", getMaxWidth);

      // Tween horizontal des sections avec snapping via ScrollTrigger
      gsap.to(sections, {
        x: () => `-${maxWidth - window.innerWidth}`,
        ease: "none",
        scrollTrigger: {
          trigger: wrapperRef.current,
          pin: true,
          scrub: true,
          end: () => `+=${maxWidth}`,
          invalidateOnRefresh: true,
          // Snap horizontal : divise la progression en incréments
          snap: {
            snapTo: 1 / (sections.length - 1), // Pour 2 sections, snapping à 0 et 1 (progress)
            duration: { min: 0.2, max: 0.5 },
            delay: 0.1,
            ease: "power1.inOut",
          },
        },
      });

      // Pour chaque section, crée un ScrollTrigger qui ajoute la classe "active"
      sections.forEach((sct, i) => {
        ScrollTrigger.create({
          trigger: sct,
          start: () =>
            "top top-=" +
            (sct.offsetLeft - window.innerWidth / 2) *
              (maxWidth / (maxWidth - window.innerWidth)),
          end: () =>
            "+=" +
            sct.offsetWidth * (maxWidth / (maxWidth - window.innerWidth)),
          toggleClass: { targets: sct, className: "active" },
        });
      });
    }, 100);
  }, []);

  return (
    <>
      <Navbar updateScrollPosition={updateScrollPosition} />

      <div ref={wrapperRef} className="flex flex-nowrap">
        <div className="z-0 pointer-events-auto">
          <PageOverlay />
        </div>

        <section id="home">
          <Hero />
        </section>
        <section id="projects">
          <Projects />
        </section>
      </div>
    </>
  );
}
