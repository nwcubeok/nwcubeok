import React from "react";
import { HomeIcon, GithubIcon, Bomb, Box } from "lucide-react";
import JojoLogo from "@/components/jojo-logo";

import { useRouter, usePathname } from "next/navigation";

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
  minecraft: Box,
};

const NAVBAR_DATA = [
  { href: "#home", icon: Icons.home, label: "Home" },
];

const PROJECTS_DATA = [
  { href: "#projects", icon: Icons.jojo, label: "Jojodle" },
  { href: "#projects", icon: Icons.bomb, label: "Minesweeper" },
  { href: "/minecraft", icon: Icons.minecraft, label: "Minecraft" },
]

const CONTACT_DATA = [
  { href: "https://github.com/nwcubeok", icon: Icons.github, label: "GitHub" },
];

export function Navbar({ updateScrollPosition }: { updateScrollPosition: (targetSection: string) => void }) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="fixed z-20 top-0 left-1/2 -translate-x-1/2">
      <TooltipProvider key={pathname}>
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
                      "rounded-full size-12 hover:cursor-pointer"
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
                  {item.href.startsWith("#") ? (
                    // Scroll (pas changé)
                    <button
                      type="button"
                      aria-label={item.label}
                      onClick={() => updateScrollPosition(item.href)}
                      className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "rounded-full size-12 hover:cursor-pointer")}
                    >
                      <item.icon />
                    </button>
                  ) : (
                    // Navigation interne sans bug
                    <button
                      type="button"
                      aria-label={item.label}
                      onClick={() => router.push(item.href)}
                      className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "rounded-full size-12 hover:cursor-pointer")}
                    >
                      <item.icon />
                    </button>
                  )}
                </TooltipTrigger>
                <TooltipContent>
                  <p>{item.label}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          ))}
          <Separator orientation="vertical" className="h-full" />
          {CONTACT_DATA.map((item) => (
            <DockIcon key={item.label}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "rounded-full size-12 hover:cursor-pointer")}
                  >
                    <item.icon />
                  </a>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{item.label}</p>
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
