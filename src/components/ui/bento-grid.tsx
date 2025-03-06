import { ReactNode } from "react";
import { ArrowRightIcon, PlayIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Pointer } from "@/components/ui/pointer";
import { TiltWrapper } from "../tilt-wrapper";

const BentoGrid = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "grid w-full h-full md:grid-cols-6 grid-cols-1 md:gap-4 gap-1.5",
        className,
      )}
    >
      {children}
    </div>
  );
};

const BentoCardProject = ({
  name,
  className,
  classNameTitle,
  classNameDescription,
  background,
  Icon,
  LargeLogo, 
  description,
  href,
  cta,
}: {
  name: string;
  className: string;
  classNameTitle?: string;
  classNameDescription?: string;
  background: ReactNode;
  Icon: any;
  LargeLogo?: ReactNode;
  description: string;
  href: string;
  cta: string;
}) => (
  <TiltWrapper
    key={name}
    className={cn(
      "group relative col-span-3 flex flex-col-reverse justify-between overflow-hidden rounded-xl hover:cursor-pointer",
      "[box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
      "transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
      className,
    )}
    maxRotation={7}
  >
    <div>
    <div className="absolute inset-0 z-0">{background}</div>

    {LargeLogo && (
    <div className="absolute top-1/2 md:right-8 right-2 z-20 -translate-y-1/2 opacity-40 pointer-events-none group-hover:opacity-60 transition-opacity duration-300">
      {LargeLogo}
    </div>
    )}

    <div className="relative z-30 bg-background/30 dark:bg-background/40 pb-11 translate-y-8 group-hover:-translate-y-0 transition-all duration-300">
      <div className="z-10 pointer-events-none flex items-center transform-gpu flex-row md:gap-4 gap-2 md:p-4 p-2 transition-all duration-300 ">
        <Icon className="size-12 origin-left transform-gpu text-neutral-700 transition-all duration-300 ease-in-out group-hover:scale-75" />
        <div>
          <h3 className={cn(
            "md:text-[1.7rem] text-xl font-[500] md:leading-8 leading-6 tracking-normal text-neutral-700 dark:text-neutral-300",
            classNameTitle
          )}>
            {name}
          </h3>
          <p className={cn(
            "max-w-lg md:text-base text-xs tracking-wide text-neutral-400",
            classNameDescription
          )}>{description}</p>
        </div>
      </div>


      <div
        className={cn(
          "pointer-events-none absolute bottom-0 flex flex-row items-center w-full transform-gpu md:p-4 p-2 opacity-0 transition-all duration-300 group-hover:opacity-100",
        )}
      >
        <Button variant="ghost" asChild size="sm" className="text-lg hover:bg-background w-full pointer-events-auto">
          <a href={href}>
            {cta}
            <PlayIcon className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </div>
    </div>
  
    <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/5 dark:group-hover:bg-neutral-800/10" />
    </div>
  </TiltWrapper>
);

export { BentoCardProject, BentoGrid };
