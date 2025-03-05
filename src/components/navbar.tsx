import React from "react";
import Link from "next/link";
import Image from "next/image";
import { HomeIcon, GithubIcon, Bomb } from "lucide-react";
import JojoLogo from "@/components/jojo-logo";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ModeToggle } from "@/components/mode-toggle";
import { Dock, DockIcon } from "@/components/ui/dock";

export type IconProps = React.HTMLAttributes<SVGElement>;

const Icons = {
  home: HomeIcon,
  github: GithubIcon,
  jojo: JojoLogo,
  bomb: Bomb,
};

const NAVBAR_DATA = [
  { href: "#home", icon: Icons.home, label: "Home" },
];

const PROJECTS_DATA = [
  { href: "#projects", icon: Icons.jojo, label: "Jojodle" },
  { href: "#projects", icon: Icons.bomb, label: "Minesweeper" },
]

const CONTACT_DATA = {
  social: {
    GitHub: {
      name: "GitHub",
      url: "https://github.com/nwcubeok",
      icon: Icons.github, 
    },
  },
};

export function Navbar({ updateScrollPosition }: { updateScrollPosition: (targetSection: string) => void }) {
  return (
    <div className="fixed z-20 top-0 left-1/2 -translate-x-1/2">
      <TooltipProvider>
        <Dock direction="middle">
          {NAVBAR_DATA.map((item) => (
            <DockIcon key={item.label}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    aria-label={item.label}
                    onClick={() => updateScrollPosition(item.href)}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon" }),
                      "size-12 hover:cursor-pointer"
                    )}
                  >
                    <item.icon/>
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{item.label}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          ))}
          <Separator orientation="vertical" className="h-full" />
          {PROJECTS_DATA.map((item) => (
            <DockIcon key={item.label}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    aria-label={item.label}
                    onClick={() => updateScrollPosition(item.href)}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon" }),
                      "size-12 hover:cursor-pointer"
                    )}
                  >
                    <item.icon/>
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{item.label}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          ))}
          <Separator orientation="vertical" className="h-full" />
          {Object.entries(CONTACT_DATA.social).map(([name, social]) => (
            <DockIcon key={name}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href={social.url} target="_blank" rel="noreferrer"
                    aria-label={social.name}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon" }),
                      "size-12 hover:cursor-pointer"
                    )}
                  >
                    <social.icon className="size-4" />
                  </a>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{name}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          ))}
          <DockIcon>
            <Tooltip>
              <TooltipTrigger asChild>
                <ModeToggle />
              </TooltipTrigger>
              <TooltipContent>
                <p>Theme</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
        </Dock>
      </TooltipProvider>
    </div>
  );
}

export default Navbar;
