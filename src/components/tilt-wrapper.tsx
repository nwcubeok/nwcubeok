import { useRef } from "react";
import { cn } from "@/lib/utils";

interface TiltWrapperProps {
  children: React.ReactNode;
  className?: string;
  maxRotation?: number;
}

export function TiltWrapper({ children, className, maxRotation = 15 }: TiltWrapperProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const animationFrameId = useRef<number | null>(null);

  const updateTransform = (clientX: number, clientY: number) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();

    // On s'assure que les coordonnées restent dans les limites de l'élément
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const y = Math.max(0, Math.min(clientY - rect.top, rect.height));

    const halfWidth = rect.width / 2;
    const halfHeight = rect.height / 2;

    // Calculer le décalage normalisé (-1 à 1)
    const deltaX = (x - halfWidth) / halfWidth;
    const deltaY = (halfHeight - y) / halfHeight;

    const rotateX = deltaY * maxRotation;
    const rotateY = deltaX * maxRotation;
    
    cardRef.current.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
    }
    animationFrameId.current = requestAnimationFrame(() => {
      updateTransform(e.clientX, e.clientY);
    });
  };

  const handleMouseLeave = () => {
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
      animationFrameId.current = null;
    }
    if (cardRef.current) {
      cardRef.current.style.transform = "rotateX(0deg) rotateY(0deg)";
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn("h-full w-full transition-transform duration-300 ease-out", className)}
    >
      {children}
    </div>
  );
}
