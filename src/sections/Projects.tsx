import { Bomb, Box } from "lucide-react";
import JojoLogo from "@/components/jojo-logo";
import JojoTitleLogo from "@/components/jojotitle-logo";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { BentoCardProject, BentoGrid } from "@/components/ui/bento-grid";
import Other from "./Other";

const projects = [
  {
    Icon: () => <JojoLogo width={48} height={48} />,
    LargeLogo: <JojoTitleLogo width={226} height={226} />,
    name: "Jojodle",
    description: "Beat the Jojodle games with new minigame every day.",
    href: "/",
    cta: "Play",
    background: (
      <div className="relative h-full w-full pointer-events-auto">
        <div className="bg-[radial-gradient(var(--light-gold-rgb),var(--dark-gold-rgb))] h-full overflow-hidden relative opacity-75">
          <div className="bg-[url('https://assets.codepen.io/1468070/Star+Pattern+3.svg')] bg-[length:10%] absolute left-1/2 top-0 translate-x-[-50%] z-0 h-full w-full min-w-[1200px] opacity-10 animate-[pan_140s_linear_infinite] will-change-[background-position]"></div>
          <div className="bg-[radial-gradient(circle,transparent_70%,var(--dark-gold-rgb))] absolute left-0 top-0 w-full h-full opacity-30 z-0"></div>
        </div>
      </div>
    ),
    classNameTitle: "text-primary",
    classNameDescription: "text-primary",
    className:
      "row-start-1 row-end-7 col-start-1 col-end-2",
  },
  {
    Icon: () => <Box width={48} height={48} />,
    LargeLogo: <Box width={226} height={226} />,
    name: "Minecraft",
    description: "All of my Minecraft projects.",
    href: "/minecraft",
    cta: "Explore",
    background: (
      <div className="relative h-full w-full pointer-events-auto">
        <div className="bg-[radial-gradient(ellipse_at_top_left,rgba(34,139,34,0.6),rgba(0,0,0,0.8))] h-full overflow-hidden relative">
          <div className="bg-[url('https://assets.codepen.io/1468070/Pixel+Pattern.svg')] bg-[length:20%] absolute left-0 top-0 h-full w-full opacity-20 animate-[pan_100s_linear_infinite]"></div>
          <div className="absolute inset-0 bg-green-800 opacity-30"></div>
        </div>
      </div>
    ),
    classNameTitle: "text-green-400",
    classNameDescription: "text-green-400",
    className:
      "row-start-1 row-end-7 col-start-2 col-end-3",
  },
  {
    Icon: () => <Bomb width={48} height={48} />,
    LargeLogo: <Bomb width={226} height={226} />,
    name: "Special Minesweeper",
    description: "A unique twist on the classic minesweeper game.",
    href: "/minesweeper",
    cta: "Play",
    background: (
      <div className="relative h-full w-full pointer-events-auto">
        <div className="bg-[radial-gradient(circle,rgba(255,69,0,0.5),rgba(0,0,0,0.8))] h-full overflow-hidden relative">
          <div className="bg-[url('https://assets.codepen.io/1468070/Grid+Pattern.svg')] bg-cover absolute inset-0 opacity-20"></div>
          <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
        </div>
      </div>
    ),
    classNameTitle: "text-red-400",
    classNameDescription: "text-red-400",
    className:
      "row-start-1 row-end-7 col-start-3 col-end-4",
  },
];

const Projects = () => {
  const blankCardNumber = 6 - projects.length;

  return (
    <div className="h-screen w-screen">
      <div className="flex flex-row h-full w-full p-7">
        <div className="w-[90%] h-full font-jersey">
          <BentoGrid className={cn(
            "grid-rows-[minmax(6rem,1fr)_minmax(6rem,1fr)_minmax(6rem,1fr)_minmax(6rem,1fr)_minmax(6rem,1fr)_minmax(6rem,1fr)_minmax(6rem,1fr)]",
            "p-8"
          )}>
            {projects.map((project) => (
              <BentoCardProject key={project.name} {...project} />
            ))}
            <div
              key={"soon"}
              className={cn(
                "group relative col-span-3 flex flex-col-reverse justify-between overflow-hidden",
                "[box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
                "transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
                "row-start-7 row-end-9 col-start-1 col-end-4"
              )}
            >
              <div className="group-hover:rotate-180 duration-200 ease-in-out absolute w-full top-1/2 -translate-y-1/2">
                <div className="flex flex-row justify-around">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <div
                      key={index}
                      className={`text-[23rem] text-primary ${
                        index % 2 === 0 ? "rotate-225 ml-10" : "rotate-45"
                      }`}
                    >
                      ?
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </BentoGrid>
        </div>
        <div className="h-full w-[10%]">
          <Other />
        </div>
      </div>
    </div>
  );
};

export default Projects;
