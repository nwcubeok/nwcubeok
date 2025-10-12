"use client";
import { cn } from "@/lib/utils";
import React, { useState, useRef, useEffect } from "react";

interface InteractiveGridPatternProps extends React.SVGProps<SVGSVGElement> {
  width?: number;           // largeur d’une case (px)
  height?: number;          // hauteur d’une case (px)
  squares?: [number, number]; // [colonnes, lignes]
  fadeDuration?: number;    // ms
  thickness?: number;       // épaisseur “pinceau”
  className?: string;
  squaresClassName?: string;
  fixedSquares?: { [index: number]: string };
}

export function InteractiveGridPattern({
  width = 40,
  height = 40,
  squares = [50, 50],
  fadeDuration = 2000,
  thickness = 1,
  className,
  squaresClassName,
  fixedSquares,
  ...props
}: InteractiveGridPatternProps) {
  const [horizontal, vertical] = squares;

  // timestamp de dernier survol par case
  const [hoverTimes, setHoverTimes] = useState<{ [index: number]: number }>({});
  // temps courant pour le fade
  const [currentTime, setCurrentTime] = useState(() => Date.now());

  // refs pour la souris / dernier point BESENHAM
  const currentMousePosRef = useRef<{ x: number; y: number } | null>(null);
  const lastUpdatedPosRef = useRef<{ x: number; y: number } | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  // état rAF
  const rafIdRef = useRef<number | null>(null);
  const runningRef = useRef<boolean>(false);

  // util — clamp dans [min, max]
  const clamp = (v: number, min: number, max: number) =>
    Math.max(min, Math.min(max, v));

  // boucle d’anim
  useEffect(() => {
    runningRef.current = true;

    const tick = () => {
      if (!runningRef.current) return;

      // avance le temps d’estompage (provoque un re-render)
      setCurrentTime(Date.now());

      const pos = currentMousePosRef.current;
      if (pos) {
        // Clamp aux bords du SVG (évite col/row hors-grille)
        let col = Math.floor(pos.x / width);
        let row = Math.floor(pos.y / height);
        col = clamp(col, 0, horizontal - 1);
        row = clamp(row, 0, vertical - 1);

        if (!lastUpdatedPosRef.current) {
          updateHoveredSquares([row * horizontal + col]);
        } else {
          // ligne entre last → current
          let colOld = Math.floor(lastUpdatedPosRef.current.x / width);
          let rowOld = Math.floor(lastUpdatedPosRef.current.y / height);
          colOld = clamp(colOld, 0, horizontal - 1);
          rowOld = clamp(rowOld, 0, vertical - 1);

          const indices = getLineIndices(colOld, rowOld, col, row, horizontal);
          updateHoveredSquares(indices);
        }
        lastUpdatedPosRef.current = { x: pos.x, y: pos.y };
      }

      rafIdRef.current = requestAnimationFrame(tick);
    };

    rafIdRef.current = requestAnimationFrame(tick);

    return () => {
      // cleanup strict & nav
      runningRef.current = false;
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      currentMousePosRef.current = null;
      lastUpdatedPosRef.current = null;
    };
    // dépendances minimales : dimensions/grille
  }, [width, height, horizontal, vertical, fadeDuration, thickness]);

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      const svg = svgRef.current;
      if (!svg) return;
      const rect = svg.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // si la souris est hors de l'aire de l'SVG, on “reset” le tracé
      if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
        currentMousePosRef.current = null;
        lastUpdatedPosRef.current = null;
        return;
      }
      currentMousePosRef.current = { x, y };
    };

    const handleLeave = () => {
      currentMousePosRef.current = null;
      lastUpdatedPosRef.current = null;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("blur", handleLeave);
    window.addEventListener("pointerleave", handleLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("blur", handleLeave);
      window.removeEventListener("pointerleave", handleLeave);
    };
  }, []);

  // met à jour les timestamps (respecte fixedSquares)
  const updateHoveredSquares = (indices: number[]) => {
    if (!indices.length) return;
    setHoverTimes((prev) => {
      const now = Date.now();
      // copie paresseuse
      const next = { ...prev };

      for (const idx of indices) {
        if (idx < 0 || idx >= horizontal * vertical) continue;
        if (fixedSquares && fixedSquares[idx] !== undefined) continue;

        if (thickness > 1) {
          const thickIndices = getThickIndices(
            idx,
            thickness,
            horizontal,
            vertical
          );
          for (const tIdx of thickIndices) {
            if (fixedSquares && fixedSquares[tIdx] !== undefined) continue;
            next[tIdx] = now;
          }
        } else {
          next[idx] = now;
        }
      }
      return next;
    });
  };

  // Bresenham en grille
  function getLineIndices(
    x0: number,
    y0: number,
    x1: number,
    y1: number,
    gridWidth: number
  ): number[] {
    const indices: number[] = [];
    const dx = Math.abs(x1 - x0);
    const dy = Math.abs(y1 - y0);
    const sx = x0 < x1 ? 1 : -1;
    const sy = y0 < y1 ? 1 : -1;
    let err = dx - dy;
    let x = x0;
    let y = y0;

    // borne dure pour éviter tout débordement
    const inBounds = (cx: number, cy: number) =>
      cx >= 0 && cx < horizontal && cy >= 0 && cy < vertical;

    while (true) {
      if (inBounds(x, y)) indices.push(y * gridWidth + x);
      if (x === x1 && y === y1) break;
      const e2 = 2 * err;
      if (e2 > -dy) {
        err -= dy;
        x += sx;
      }
      if (e2 < dx) {
        err += dx;
        y += sy;
      }
    }
    return indices;
  }

  // indices épais autour d’une case
  const getThickIndices = (
    index: number,
    thickness: number,
    gridWidth: number,
    gridHeight: number
  ): number[] => {
    const out: number[] = [];
    const col = index % gridWidth;
    const row = Math.floor(index / gridWidth);
    const half = Math.floor((thickness - 1) / 2);

    for (let dy = -half; dy <= half; dy++) {
      for (let dx = -half; dx <= half; dx++) {
        const newRow = row + dy;
        const newCol = col + dx;
        if (
          newRow >= 0 &&
          newRow < gridHeight &&
          newCol >= 0 &&
          newCol < gridWidth
        ) {
          out.push(newRow * gridWidth + newCol);
        }
      }
    }
    return out;
  };

  const total = horizontal * vertical;

  return (
    <svg
      ref={svgRef}
      width={width * horizontal}
      height={height * vertical}
      className={cn("absolute inset-0 h-full w-full", className)}
      {...props}
    >
      {Array.from({ length: total }).map((_, index) => {
        const xPos = (index % horizontal) * width;
        const yPos = Math.floor(index / horizontal) * height;
        const hoverTime = hoverTimes[index];

        let opacity = 0;
        if (hoverTime) {
          const delta = currentTime - hoverTime;
          opacity = Math.max(0, 1 - delta / fadeDuration);
        }

        const fillColor =
          fixedSquares && fixedSquares[index] !== undefined
            ? fixedSquares[index]
            : opacity > 0
            ? `hsl(var(--dot-color) / ${opacity})`
            : "transparent";

        return (
          <rect
            key={index}
            x={xPos}
            y={yPos}
            width={width}
            height={height}
            style={{
              fill: fillColor,
              transition: "fill 0.5s ease-out",
            }}
            className={cn("stroke-gray-400/5", squaresClassName)}
          />
        );
      })}
    </svg>
  );
}
