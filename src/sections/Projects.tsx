import {
  BellIcon,
  CalendarIcon,
  FileTextIcon,
  GlobeIcon,
  InputIcon,
} from "@radix-ui/react-icons";
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
    cta: "Go",
    background: (
      <div className="relative h-full w-full">
        <div className="bg-[radial-gradient(var(--light-gold-rgb),var(--dark-gold-rgb))] h-full overflow-hidden relative">
          <div className="bg-[url('https://assets.codepen.io/1468070/Star+Pattern+3.svg')] bg-[length:10%] absolute left-1/2 top-0 translate-x-[-50%] z-0 h-full w-full min-w-[1200px] opacity-10 animate-[pan_140s_linear_infinite] will-change-[background-position]"></div>
          <div className="bg-[radial-gradient(circle,transparent_75%,var(--dark-gold-rgb))] absolute left-0 top-0 w-full h-full opacity-90 z-0"></div>
        </div>
      </div>
    ),
    classNameTitle: "text-black dark:text-white",
    classNameDescription: "text-black dark:text-white",
    className: "row-start-1 row-end-7 col-start-1 col-end-2 hover:skew-x-[-2deg] transiton-all duration-300 ease-in-out",
  },
];

const Projects = () => {
  return (
    <section
      id="projects"
      className="flex-shrink-0 h-screen w-screen relative flex flex-row items-center justify-center"
    >
      <div className="w-full h-fit px-8">
        <BentoGrid className="grid-rows-[minmax(6rem,1fr)_minmax(6rem,1fr)_minmax(6rem,1fr)_minmax(6rem,1fr)_minmax(6rem,1fr)_minmax(6rem,1fr)_minmax(6rem,1fr)]">
          {projects.map((project) => (
            <BentoCardProject key={project.name} {...project} />
          ))}
          <div
            key={"soon"}
            className={cn(
              "group relative col-span-3 flex flex-col-reverse justify-between overflow-hidden rounded-xl",
              "[box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
              "transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
              "hover:skew-x-[-2deg] transiton-all duration-300 ease-in-out",
              "row-start-7 row-end-9 col-start-1 col-end-4"
            )}
          >
            <div className="absolute dark:invert opacity-85 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <Image
                src="/soon.svg"
                alt="soon"
                width={190}
                height={190}
              />
            </div>
          </div>
        </BentoGrid>
      </div>
      <div>

      </div>
      <Other/>
    </section>
  );
};

export default Projects;
