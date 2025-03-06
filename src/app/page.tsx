"use client";
import React, { useRef, useEffect, useState } from "react";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollToPlugin from "gsap/ScrollToPlugin";

import PageOverlay from "@/components/page-overlay";
import Navbar from "@/components/navbar";
import Hero from "@/sections/Hero";
import Projects from "@/sections/Projects";

export default function Home() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  let maxWidth = 0;
  const [isMobile, setIsMobile] = useState(true);

  // Détecte si l'appareil est mobile (ici, largeur < 768px)
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  // Fonction de navigation vers une section spécifique
  const updateScrollPosition = (href: string) => {
    if (isMobile) {
      const targetElement = document.querySelector(href);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
      return;
    }
    const sectionWidth = window.innerWidth;
    let targetX = 0;
    if (href === "#home") targetX = 0;
    else if (href === "#projects") targetX = -sectionWidth;
    const targetY = (Math.abs(targetX) / (maxWidth - window.innerWidth)) * maxWidth;
    console.log("Scrolling to X:", targetX);
    console.log("Scrolling to Y:", targetY);
    if (window.scrollY === targetY) return;
    else {
      document.body.style.overflow = "hidden";
      gsap.to(window, {
        scrollTo: { y: targetY },
        duration: 1.2,
        ease: "power2.out",
        onComplete: () => {
          document.body.style.overflow = "";
        },
      });
    }
  };
  

  useEffect(() => {
    if (isMobile) return; // Sur mobile, on ne configure pas le scroll horizontal.
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
    const sections = gsap.utils.toArray<HTMLElement>("section");
    const getMaxWidth = () => {
      maxWidth = 0;
      sections.forEach((section) => {
        maxWidth += section.offsetWidth;
      });
    };

    setTimeout(() => {
      getMaxWidth();
      ScrollTrigger.addEventListener("refreshInit", getMaxWidth);

      // Tween horizontal des sections avec ScrollTrigger
      gsap.to(sections, {
        x: () => `-${maxWidth - window.innerWidth}`,
        ease: "none",
        scrollTrigger: {
          trigger: wrapperRef.current,
          pin: true,
          scrub: true,
          end: () => `+=${maxWidth}`,
          invalidateOnRefresh: true,
          snap: {
            snapTo: 1 / (sections.length - 1),
            duration: { min: 0.2, max: 0.5 },
            delay: 0.1,
            ease: "power1.inOut",
          },
        },
      });

      sections.forEach((sct) => {
        ScrollTrigger.create({
          trigger: sct,
          start: () =>
            "top top-=" +
            (sct.offsetLeft - window.innerWidth / 2) *
              (maxWidth / (maxWidth - window.innerWidth)),
          end: () =>
            "+=" + sct.offsetWidth * (maxWidth / (maxWidth - window.innerWidth)),
          toggleClass: { targets: sct, className: "active" },
        });
      });
    }, 100);
  }, [isMobile]);

  return (
    <>
      <Navbar updateScrollPosition={updateScrollPosition} />

      <div
        ref={wrapperRef}
        className={isMobile ? "block" : "flex flex-nowrap"}
      >
        <div className="fixed z-0 pointer-events-auto">
          <PageOverlay />
        </div>
        <section id="home" className={"pointer-events-none"}>
          <Hero />
        </section>
        <section id="projects" className={"pointer-events-none"}>
          <Projects />
        </section>
      </div>
    </>
  );
}
