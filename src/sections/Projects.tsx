import {
    BellIcon,
    CalendarIcon,
    FileTextIcon,
    GlobeIcon,
    InputIcon,
  } from "@radix-ui/react-icons";
import JojoLogo from "@/components/jojo-logo";
import JojoTitleLogo from "@/components/jojotitle-logo";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
 
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
    classNameTitle: "bg-gradient-to-r from-blue-100 to-slate-400 bg-clip-text text-transparent",
    classNameDescription: "",
    className: "lg:row-start-1 lg:row-end-3 lg:col-start-1 lg:col-end-4",
  },
  {
    Icon: InputIcon,
    name: "Coming soon",
    description: "Search through all your files in one place.",
    href: "/",
    cta: "Learn more",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: "lg:row-start-3 lg:row-end-4 lg:col-start-1 lg:col-end-4",
  }
];

const Projects = () => {
    return (
        <section id="projects" className="flex flex-col items-center justify-center mt-16">
          <div className="relative h-full w-full">
            <BentoGrid className="px-5 lg:grid-rows-4">
                {projects.map((project) => (
                    <BentoCard key={project.name} {...project} />
                ))}
            </BentoGrid>
          </div>
        </section>
    );
};

export default Projects;