import Tilt from "react-parallax-tilt";
import { cn } from "@/lib/utils";

interface TiltWrapperProps {
  children: React.ReactNode;
  className?: string;
  maxRotation?: number;
}

export function TiltWrapper({ children, className, maxRotation = 15 }: TiltWrapperProps) {
  return (
    <Tilt
      tiltMaxAngleX={0}
      tiltMaxAngleY={maxRotation}
      perspective={3500} // contrôle la profondeur
      transitionSpeed={300} // durée transition en ms
      tiltReverse={true}
      gyroscope={true} // support mobile tilt
      className={cn("will-change-transform", className)}
    >
      {children}
    </Tilt>
  );
}
