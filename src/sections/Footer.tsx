"use client"

import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern";
import { cn } from "@/lib/utils";

const Footer = () => {
    return (
        <footer className="relative flex h-16 flex-col items-center justify-center overflow-hidden border-t mt-10 bg-black dark:bg-white">
            <p className="text-sm text-white dark:text-black">
                &copy; {new Date().getFullYear()} nwcubeok. All rights reserved.
            </p>
            <InteractiveGridPattern
                width={40}
                height={37}
                squares={[51, 51]}
                className={cn(
                "",
                ""
                )}
            />
        </footer>
    );
}

export default Footer;