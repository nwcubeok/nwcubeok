
import React, { useState, useEffect, useRef } from "react"; 
import {InteractiveGridPattern} from "@/components/ui/interactive-grid-pattern";
import { useTheme } from "next-themes";

const PageOverlay = () => {
    const [mounted, setMounted] = useState(false);

    // Ne pas rendre le composant tant que le thème n'est pas chargé
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-0">
            <InteractiveGridPattern
                squares={[50, 50]}
                className="h-full w-full"
            />
        </div>
    );
}

export default PageOverlay;