import { cn } from "@/lib/utils";

import { GithubIcon } from "lucide-react";
import Image from "next/image";

const socials = [
    { name: "GitHub", url: "https://github.com/nwcubeok", icon: GithubIcon },
    { name: "Discord", url: "https://discord.com/users/100000000000000000", icon: Image },
    { name: "X", url: "https://twitter.com/nwcubeok", icon: Image },
    { name: "Twitch", url: "https://twitch.tv/nwcubeok", icon: Image },
];

const Other = () => {
    return (
        <div id="other" className="h-full w-full">
            <div className="flex flex-col justify-between h-full py-8">
                <div className={cn(
                    "flex flex-col justify-evenly items-center w-full h-[70%] rounded-xl",
                    "[box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
                    "transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
                )}>
                    {socials.map((social) => (
                        <div className={cn(
                            "rounded-xl h-fit w-fit hover:cursor-pointer",
                            "[box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
                            "transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
                        )}>
                            <a
                                key={social.name}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex flex-row items-center justify-center px-4 py-2"
                            >  
                                <social.icon height={30} width={30} />
                            </a>
                        </div>
                    ))}
                </div>
                <div className="place-self-end font-jersey text-xl hover:cursor-pointer">
                    v.1.0.0
                </div>
            </div>
        </div>
    );
};

export default Other;