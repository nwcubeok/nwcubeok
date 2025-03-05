
import React, { useState, useEffect } from "react"; 
import {InteractiveGridPattern} from "@/components/ui/interactive-grid-pattern";
import { useTheme } from "next-themes";

const PageOverlay = () => {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Ne pas rendre le composant tant que le thème n'est pas chargé
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const color = resolvedTheme === 'dark' ? '#f5e8f6' : '#11090f'

    return (

        <div className="fixed w-screen h-screen">
            <InteractiveGridPattern
                squares={[50, 50]}
                className={"h-full w-full z-0"}
                //fixedSquares={{"597" : color, "648" : color, "697" : color}}
            />
        </div>
    );
}

export default PageOverlay;