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
  let maxWidth : number;

  // Fonction de navigation vers une section spécifique
  const updateScrollPosition = (href: string) => {
  
    const sectionWidth = window.innerWidth;
    let targetX = 0;
  
    if (href === "#home") targetX = 0;
    else if (href === "#projects") targetX = -sectionWidth;
    
    const targetY = (Math.abs(targetX) / (maxWidth - window.innerWidth)) * maxWidth;
    console.log("Scrolling to X:", targetX);
    console.log("Scrolling to Y:", targetY);
    console.log(window.scrollY)
    console.log(maxWidth)
    
    // Si on se trouve deja sur la section on ne fait rien
    if (window.scrollY === targetY) return;
    else {
      // Désactive le scroll en cachant le débordement du body
      document.body.style.overflow = 'hidden';
      console.log("go")
  
      gsap.to(window, { 
        scrollTo: { y: targetY }, 
        duration: 1.2, 
        ease: "power2.out",
        onComplete: () => {
          // Réactive le scroll une fois l'animation terminée
          document.body.style.overflow = '';
        }
      });
    }
  };

  useEffect(() => {
    // Enregistrement des plugins
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    // Sélectionne les éléments <section>
    const sections = gsap.utils.toArray<HTMLElement>("section");

    // Fonction pour calculer la largeur totale
    const getMaxWidth = () => {
      maxWidth = 0;
      sections.forEach((section) => {
        maxWidth += section.offsetWidth;
      });
      console.log("Largeur totale :", maxWidth);
    };

    // Délai pour s'assurer que le layout est prêt
    setTimeout(() => {
      getMaxWidth();
      // Recalcule la largeur lors d'un rafraîchissement (redimensionnement, etc.)
      ScrollTrigger.addEventListener("refreshInit", getMaxWidth);

      // Animation qui translate horizontalement les sections
      const scrollTween = gsap.to(sections, {
        x: () => `-${maxWidth - window.innerWidth}`,
        ease: "none",
        scrollTrigger: {
          trigger: wrapperRef.current,
          pin: true,
          scrub: true,
          end: () => `+=${maxWidth}`,
          invalidateOnRefresh: true,
        }
      });

      sections.forEach((sct, i) => {
        ScrollTrigger.create({
          trigger: sct,
          start: () => 'top top-=' + (sct.offsetLeft - window.innerWidth/2) * (maxWidth / (maxWidth - window.innerWidth)),
          end: () => '+=' + sct.offsetWidth * (maxWidth / (maxWidth - window.innerWidth)),
          toggleClass: {targets: sct, className: "active"}
        });
      });
    }, 100);

  }, []);

  return (
    <>
    
      <Navbar updateScrollPosition={updateScrollPosition} />


      <div
        ref={wrapperRef}
        className="flex flex-nowrap"
      >
        <div className="z-0 pointer-events-auto">
          <PageOverlay />

        </div>
        
        <section id="home" className="pointer-events-none">
          <Hero />
        </section>
        <section id="projects" className="pointer-events-none">
          <Projects />
        </section>
      </div>
    </>
  );
}
