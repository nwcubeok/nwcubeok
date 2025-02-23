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
}

export function InteractiveGridPattern({
  width = 40,
  height = 40,
  squares = [24, 24],
  fadeDuration = 2000,
  thickness = 1,
  className,
  squaresClassName,
  ...props
}: InteractiveGridPatternProps) {
  // Décomposition de la grille en nombre de colonnes et lignes
  const [horizontal, vertical] = squares;
  // Pour chaque case (par son index), on stocke le timestamp de son dernier survol
  const [hoverTimes, setHoverTimes] = useState<{ [index: number]: number }>({});
  // Temps courant (pour le calcul de l'estompage)
  const [currentTime, setCurrentTime] = useState(Date.now());

  // Référence qui stocke la position actuelle de la souris dans le SVG
  const currentMousePosRef = useRef<{ x: number; y: number } | null>(null);
  // Référence qui stocke le dernier point traité dans la boucle d'animation
  const lastUpdatedPosRef = useRef<{ x: number; y: number } | null>(null);

  // Boucle d'animation qui se déclenche en continu pour :
  // - Mettre à jour le temps courant (pour l'estompage)
  // - Calculer et tracer la ligne entre le dernier point traité et la position actuelle de la souris
  useEffect(() => {
    let animationFrame: number;
    const tick = () => {
      setCurrentTime(Date.now());

      if (currentMousePosRef.current) {
        const pos = currentMousePosRef.current;

        if (!lastUpdatedPosRef.current) {
          // Première position : on met à jour la cellule correspondante
          const col = Math.floor(pos.x / width);
          const row = Math.floor(pos.y / height);
          const newIndex = row * horizontal + col;
          updateHoveredSquares([newIndex]);
        } else {
          // Calcul de la ligne entre le dernier point traité et la position actuelle
          const lastPos = lastUpdatedPosRef.current;
          const colOld = Math.floor(lastPos.x / width);
          const rowOld = Math.floor(lastPos.y / height);
          const colNew = Math.floor(pos.x / width);
          const rowNew = Math.floor(pos.y / height);
          const indices = getLineIndices(colOld, rowOld, colNew, rowNew, horizontal);
          updateHoveredSquares(indices);
        }
        // Mettre à jour le dernier point traité pour la prochaine frame
        lastUpdatedPosRef.current = pos;
      }

      animationFrame = requestAnimationFrame(tick);
    };

    animationFrame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationFrame);
  }, [width, horizontal, vertical]);

  // Lors d'un mousemove, on met à jour la position actuelle de la souris
  const handleMouseMove = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    const svg = event.currentTarget;
    const rect = svg.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    currentMousePosRef.current = { x, y };
  };

  // À la sortie du SVG, on réinitialise les références
  const handleMouseLeave = () => {
    currentMousePosRef.current = null;
    lastUpdatedPosRef.current = null;
  };

  /**
   * Met à jour le timestamp de survol pour chaque case (ou groupe de cases
   * si une épaisseur est appliquée) afin de gérer l'estompage.
   *
   * @param indices Tableau d'indices de cases à mettre à jour
   */
  const updateHoveredSquares = (indices: number[]) => {
    setHoverTimes((prev) => {
      const newTimes = { ...prev };
      const now = Date.now();
      indices.forEach((idx) => {
        if (thickness > 1) {
          const thickIndices = getThickIndices(idx, thickness, horizontal, vertical);
          thickIndices.forEach((tIdx) => {
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
   * Algorithme de Bresenham pour obtenir les indices des cases situées entre deux points.
   *
   * @param x0 Colonne de départ
   * @param y0 Ligne de départ
   * @param x1 Colonne d'arrivée
   * @param y1 Ligne d'arrivée
   * @param gridWidth Nombre de colonnes dans la grille
   * @returns Tableau d'indices correspondant aux cases traversées
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
   * Renvoie les indices "épais" autour d'une case.
   * Pour un index donné, on remplit les cases voisines en fonction de l'épaisseur.
   *
   * @param index Index de la case centrale
   * @param thickness Épaisseur désirée (>= 1)
   * @param gridWidth Nombre de colonnes dans la grille
   * @param gridHeight Nombre de lignes dans la grille
   * @returns Tableau d'indices correspondant à la zone élargie
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
      className={cn("absolute inset-0 h-full w-full border border-gray-400/30", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {Array.from({ length: horizontal * vertical }).map((_, index) => {
        // Calcul de la position de la case dans le SVG
        const xPos = (index % horizontal) * width;
        const yPos = Math.floor(index / horizontal) * height;
        // Calcul de l'opacité en fonction du temps écoulé depuis le dernier survol
        const hoverTime = hoverTimes[index];
        let opacity = 0;
        if (hoverTime) {
          const delta = currentTime - hoverTime;
          opacity = Math.max(0, 1 - delta / fadeDuration);
        }
        return (
          <rect
            key={index}
            x={xPos}
            y={yPos}
            width={width}
            height={height}
            style={{
              fill: opacity > 0 ? `rgba(107, 114, 128, ${opacity})` : "transparent",
              transition: "fill 0.1s ease-in-out",
            }}
            className={cn("stroke-gray-400/5", squaresClassName)}
          />
        );
      })}
    </svg>
  );
}
