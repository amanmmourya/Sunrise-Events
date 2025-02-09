import { useMotionValue, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { MotionConfig } from "framer-motion";
import { motion } from "framer-motion";

function TiltCard({ children }) {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Inverted values for push effect
  const rotateX = useTransform(y, [-0.5, 0.5], [20, -20]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-20, 20]);

  // Smooth transitions
  const smoothRotateX = useSpring(rotateX, { stiffness: 150, damping: 10 });
  const smoothRotateY = useSpring(rotateY, { stiffness: 150, damping: 10 });

  // Depth effect (Push part inside)
  const depth = useTransform(x, [-0.5, 0.5], [30, -30]);

  const smoothDepth = useSpring(depth, { stiffness: 120, damping: 12 });

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) / rect.width;
    const deltaY = (e.clientY - centerY) / rect.height;

    x.set(deltaX);
    y.set(deltaY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      style={{
        rotateX: smoothRotateX,
        rotateY: smoothRotateY,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          transformStyle: "preserve-3d",
          translateZ: smoothDepth, // Pushes the hovered part inside
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export default TiltCard;
