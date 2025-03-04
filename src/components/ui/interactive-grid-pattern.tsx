import { cn } from "@/lib/utils";
import React, { useState, useRef, useEffect } from "react";

interface InteractiveGridPatternProps extends React.SVGProps<SVGSVGElement> {
  /** Largeur d'un carré (en pixels) */
  width?: number;
  /** Hauteur d'un carré (en pixels) */
  height?: number;
  /** Nombre de carrés dans la grille : [nombre horizontal, nombre vertical] */
  squares?: [number, number];
  /** Durée d'estompage de chaque carré après survol (en ms) */
  fadeDuration?: number;
  /** Épaisseur de la ligne (1 = case unique, >1 = on remplit également les cases voisines) */
  thickness?: number;
  /** Classes CSS à appliquer sur l'élément SVG */
  className?: string;
  /** Classes CSS à appliquer sur chaque carré */
  squaresClassName?: string;
  /**
   * Objet optionnel pour fixer la couleur de certains carrés.
   * La clé est l'indice du carré et la valeur la couleur (ex. { "10": "red", "20": "blue" }).
   */
  fixedSquares?: { [index: number]: string };
}

export function InteractiveGridPattern({
  width = 40,
  height = 40,
  squares = [24, 24],
  fadeDuration = 2000,
  thickness = 1,
  className,
  squaresClassName,
  fixedSquares,
  ...props
}: InteractiveGridPatternProps) {
  // Décomposition de la grille en colonnes et lignes
  const [horizontal, vertical] = squares;
  // Stocke pour chaque case le timestamp de son dernier survol
  const [hoverTimes, setHoverTimes] = useState<{ [index: number]: number }>({});
  // Temps courant (pour le calcul de l'estompage)
  const [currentTime, setCurrentTime] = useState(Date.now());

  // Références pour la position de la souris et le dernier point traité
  const currentMousePosRef = useRef<{ x: number; y: number } | null>(null);
  const lastUpdatedPosRef = useRef<{ x: number; y: number } | null>(null);

  // Boucle d'animation pour mettre à jour currentTime et tracer la case sous la souris
  useEffect(() => {
    let animationFrame: number;
    const tick = () => {
      setCurrentTime(Date.now());

      if (currentMousePosRef.current) {
        const pos = currentMousePosRef.current;
        if (!lastUpdatedPosRef.current) {
          // Première position : on met à jour la case correspondante
          const col = Math.floor(pos.x / width);
          const row = Math.floor(pos.y / height);
          const newIndex = row * horizontal + col;
          updateHoveredSquares([newIndex]);
        } else {
          // Calculer la ligne entre le dernier point traité et la position actuelle
          const lastPos = lastUpdatedPosRef.current;
          const colOld = Math.floor(lastPos.x / width);
          const rowOld = Math.floor(lastPos.y / height);
          const colNew = Math.floor(pos.x / width);
          const rowNew = Math.floor(pos.y / height);
          const indices = getLineIndices(colOld, rowOld, colNew, rowNew, horizontal);
          updateHoveredSquares(indices);
        }
        // Mettre à jour le dernier point traité
        lastUpdatedPosRef.current = pos;
      }

      animationFrame = requestAnimationFrame(tick);
    };

    animationFrame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationFrame);
  }, [width, horizontal, vertical, fixedSquares]);

  // Mise à jour de la position de la souris dans le SVG
  const handleMouseMove = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    const svg = event.currentTarget;
    const rect = svg.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    currentMousePosRef.current = { x, y };
  };

  // Réinitialisation lors du départ de la souris
  const handleMouseLeave = () => {
    currentMousePosRef.current = null;
    lastUpdatedPosRef.current = null;
  };

  /**
   * Met à jour le timestamp pour chaque case (ou groupe de cases si thickness > 1)
   * sauf pour les cases fixées (définies dans fixedSquares).
   */
  const updateHoveredSquares = (indices: number[]) => {
    setHoverTimes((prev) => {
      const newTimes = { ...prev };
      const now = Date.now();
      indices.forEach((idx) => {
        // Si cette case est fixée, ne pas la modifier
        if (fixedSquares && fixedSquares[idx] !== undefined) return;
        if (thickness > 1) {
          const thickIndices = getThickIndices(idx, thickness, horizontal, vertical);
          thickIndices.forEach((tIdx) => {
            // On ne modifie pas une case fixée
            if (fixedSquares && fixedSquares[tIdx] !== undefined) return;
            newTimes[tIdx] = now;
          });
        } else {
          newTimes[idx] = now;
        }
      });
      return newTimes;
    });
  };

  /**
   * Algorithme de Bresenham pour récupérer les indices des cases entre deux points (en coordonnées de grille)
   */
  function getLineIndices(
    x0: number,
    y0: number,
    x1: number,
    y1: number,
    gridWidth: number,
  ): number[] {
    const indices: number[] = [];
    const dx = Math.abs(x1 - x0);
    const dy = Math.abs(y1 - y0);
    const sx = x0 < x1 ? 1 : -1;
    const sy = y0 < y1 ? 1 : -1;
    let err = dx - dy;
    let x = x0;
    let y = y0;
    while (true) {
      indices.push(y * gridWidth + x);
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

  /**
   * Retourne les indices "épais" autour d'une case.
   */
  const getThickIndices = (
    index: number,
    thickness: number,
    gridWidth: number,
    gridHeight: number,
  ): number[] => {
    const indices: number[] = [];
    const col = index % gridWidth;
    const row = Math.floor(index / gridWidth);
    const half = Math.floor((thickness - 1) / 2);
    for (let dy = -half; dy <= half; dy++) {
      for (let dx = -half; dx <= half; dx++) {
        const newRow = row + dy;
        const newCol = col + dx;
        if (newRow >= 0 && newRow < gridHeight && newCol >= 0 && newCol < gridWidth) {
          indices.push(newRow * gridWidth + newCol);
        }
      }
    }
    return indices;
  };
  

  return (
    <svg
      width={width * horizontal}
      height={height * vertical}
      className={cn("absolute inset-0 h-full w-full", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {Array.from({ length: horizontal * vertical }).map((_, index) => {
        const xPos = (index % horizontal) * width;
        const yPos = Math.floor(index / horizontal) * height;
        const hoverTime = hoverTimes[index];
        let opacity = 0;
        if (hoverTime) {
          const delta = currentTime - hoverTime;
          opacity = Math.max(0, 1 - delta / fadeDuration);
        }
        // Si la case est fixée, utilisez la couleur fixe, sinon la couleur calculée
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
