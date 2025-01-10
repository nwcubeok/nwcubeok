import { ReactNode } from "react";
import { ArrowRightIcon, PlayIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

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
        "grid w-full h-full grid-cols-3 gap-4",
        className,
      )}
    >
      {children}
    </div>
  );
};

const BentoCard = ({
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
  <div
    key={name}
    className={cn(
      "group relative col-span-3 flex flex-col-reverse justify-between overflow-hidden rounded-xl hover:cursor-pointer",
      "[box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
      "transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
      className,
    )}
  >
    <div className="absolute inset-0 z-0">{background}</div>
    <div className="relative z-10 pointer-events-none flex transform-gpu flex-row gap-4 p-4 transition-all duration-300 group-hover:-translate-y-10">
      <Icon className="h-12 w-12 origin-left transform-gpu text-neutral-700 transition-all duration-300 ease-in-out group-hover:scale-75" />
      <div>
        <h3 className={cn(
          "text-xl font-semibold text-neutral-700 dark:text-neutral-300",
          classNameTitle
        )}>
          {name}
        </h3>
        <p className={cn(
          "max-w-lg text-neutral-400",
          classNameDescription
        )}>{description}</p>
      </div>
    </div>

    {LargeLogo && (
    <div className="absolute top-1/2 right-8 z-20 -translate-y-1/2 opacity-40 pointer-events-none group-hover:opacity-60 transition-opacity duration-300">
      {LargeLogo}
    </div>
    )}


    <div
      className={cn(
        "pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100",
      )}
    >
      <Button variant="ghost" asChild size="sm" className="pointer-events-auto">
        <a href={href}>
          {cta}
          <PlayIcon className="ml-2 h-4 w-4" />
        </a>
      </Button>
    </div>
    <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10" />
  </div>
);

export { BentoCard, BentoGrid };
