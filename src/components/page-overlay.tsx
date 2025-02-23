
import React, { useState, useEffect } from "react"; 
import { cn } from "@/lib/utils";
import {InteractiveGridPattern} from "@/components/ui/interactive-grid-pattern";

const PageOverlay = () => {
    return (
        <div className="w-screen h-screen">
            <InteractiveGridPattern
                width={41}
                height={37}
                squares={[50, 50]}
                className={"h-full w-full"}
            />
        </div>
    );
}

export default PageOverlay;