import { BentoGrid, BentoCardSocial } from "@/components/ui/bento-grid";

import { GithubIcon } from "lucide-react";

const socials = [
    {
      Icon: GithubIcon,
      LargeLogo: null,
      name: "Jojodle",
      description: "Beat the Jojodle games with new minigame every day.",
      href: "/",
      cta: "Go",
      background: (
        <div className="bg-white"/>
      ),
      classNameTitle: "text-black dark:text-white",
      classNameDescription: "text-black dark:text-white",
      className: "row-start-1 row-end-1 col-start-1 col-end-1 hover:skew-x-[-2deg] transiton-all duration-300 ease-in-out",
    },
];

const Other = () => {
    return (
        <div id="other" className="h-full mr-12 py-16">
            <BentoGrid className="grid-rows-5 grid-cols-1">
                {socials.map((social) => (
                    <BentoCardSocial key={social.name} {...social} />
                ))}
            </BentoGrid>
        </div>
    );
};

export default Other;