import { motion, easeInOut } from 'framer-motion';
import type { ReactNode } from 'react';

interface FadeInProps {
  children: ReactNode;
  delay?: number; // Time to wait before starting (0.1, 0.2...)
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
  fullWidth?: boolean;
}

const FadeIn = ({ children, delay = 0, direction = 'up', className = '', fullWidth = false }: FadeInProps) => {
  
  // Configure the start (hidden) and end (visible) positions
  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
      x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.8, // Smooth and slow
        ease: easeInOut, // Premium easing function
        delay: delay,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }} // Trigger when 50px of the item is seen
      variants={variants}
      className={className}
      style={{ width: fullWidth ? '100%' : 'auto' }}
    >
      {children}
    </motion.div>
  );
};

export default FadeIn;