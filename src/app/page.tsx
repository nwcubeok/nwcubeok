"use client";
import React, { useRef, useLayoutEffect, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollToPlugin from "gsap/ScrollToPlugin";

import PageOverlay from "@/components/page-overlay";
import Navbar from "@/components/navbar";
import Hero from "@/sections/Hero";
import Projects from "@/sections/Projects";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function Home() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLElement[]>([]);
  const scrollTweenRef = useRef<gsap.core.Tween | null>(null);
  const [isMobile, setIsMobile] = useState(true);

  // Mobile?
  useLayoutEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  // Scroll to section (utilise le tween ref pour kill proprement)
  const updateScrollPosition = (href: string) => {
    if (isMobile) {
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: "smooth" });
      return;
    }
    const sectionWidth = window.innerWidth;
    let targetX = 0;
    if (href === "#home") targetX = 0;
    else if (href === "#projects") targetX = -sectionWidth;

    const maxWidth = sectionsRef.current.reduce((sum, el) => sum + el.offsetWidth, 0);
    const targetY = (Math.abs(targetX) / (maxWidth - window.innerWidth)) * maxWidth;

    if (Math.round(window.scrollY) === Math.round(targetY)) return;

    // kill l'ancien tween si encore actif (évite nettoyages tardifs au changement de page)
    scrollTweenRef.current?.kill();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    scrollTweenRef.current = gsap.to(window, {
      scrollTo: { y: targetY },
      duration: 1.2,
      ease: "power2.out",
      onComplete: () => {
        document.body.style.overflow = prevOverflow;
        scrollTweenRef.current = null;
      },
      onInterrupt: () => {
        document.body.style.overflow = prevOverflow;
      },
    });
  };

  // GSAP horizontal scroll
  useLayoutEffect(() => {
    if (isMobile) return;

    const ctx = gsap.context(() => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;

      // Récupère les sections une fois, et garde la ref
      sectionsRef.current = gsap.utils.toArray<HTMLElement>("section");

      // Calcule la largeur totale
      const getMaxWidth = () =>
        sectionsRef.current.reduce((sum, el) => sum + el.offsetWidth, 0);

      const maxWidth = { value: getMaxWidth() };
      ScrollTrigger.addEventListener("refreshInit", () => {
        maxWidth.value = getMaxWidth();
      });

      // Tween horizontal piloté par la scrollY
      const horizontalTween = gsap.to(sectionsRef.current, {
        x: () => `-${maxWidth.value - window.innerWidth}`,
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          pin: true,
          scrub: true,
          end: () => `+=${maxWidth.value}`,
          invalidateOnRefresh: true,
          snap: {
            snapTo: 1 / (sectionsRef.current.length - 1),
            duration: { min: 0.2, max: 0.5 },
            delay: 0.1,
            ease: "power1.inOut",
          },
        },
      });

      // Sections actives
      sectionsRef.current.forEach((sct) => {
        ScrollTrigger.create({
          trigger: sct,
          start: () =>
            "top top-=" +
            (sct.offsetLeft - window.innerWidth / 2) *
              (maxWidth.value / (maxWidth.value - window.innerWidth)),
          end: () =>
            "+=" + sct.offsetWidth * (maxWidth.value / (maxWidth.value - window.innerWidth)),
          toggleClass: { targets: sct, className: "active" },
        });
      });

      // Première mise à jour
      ScrollTrigger.refresh();

      // Cleanup automatique via ctx.revert()
      return () => {
        // rien ici: ctx.revert() fera:
        // - kill des tweens/triggers
        // - clearProps appliqués par GSAP
        // - dépin propre et retrait des spacers
      };
    }, wrapperRef);

    // Cleanup global du composant (navigation, strict mode)
    return () => {
      // kill éventuel scrollTo en cours
      scrollTweenRef.current?.kill();
      scrollTweenRef.current = null;

      // revert toutes les anims/triggers du contexte
      ctx.revert();

      // Par sécurité, restaure overflow (au cas où)
      document.body.style.overflow = "";
    };
  }, [isMobile]);

  return (
    <>
      <Navbar updateScrollPosition={updateScrollPosition} />

      <div ref={wrapperRef} className={isMobile ? "block" : "flex flex-nowrap"}>
        {/* L’overlay ne doit pas intercepter la souris si tu as des interactions au-dessus */}
        <div className="fixed inset-0 z-0 pointer-events-none">
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
