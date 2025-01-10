import React from "react";

import DotPattern from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";

import Navbar from "@/components/navbar";
import Hero from "@/sections/Hero";
import Projects from "@/sections/Projects";
import Footer from "@/sections/Footer";

export default function Home() {
  return (
    <>
    <main className="max-w-7xl mx-auto">
      <Navbar/>
      <Hero/>
      <Projects/>
    </main>
    <Footer/>
    </>
  );
}

