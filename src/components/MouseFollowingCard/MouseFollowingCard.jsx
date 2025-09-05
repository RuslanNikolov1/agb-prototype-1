import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from './MouseFollowingCard.module.scss';

const MouseFollowingCard = ({ 
  children, 
  className = '', 
  offsetX = 20, 
  offsetY = 20,
  smoothness = 0.15,
  enabled = true 
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cardPosition, setCardPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);
  const animationRef = useRef(null);
  const lastMousePosition = useRef({ x: 0, y: 0 });

  // Throttled mouse move handler for better performance
  const handleMouseMove = useCallback((e) => {
    const now = Date.now();
    if (now - lastMousePosition.current.timestamp < 16) return; // ~60fps throttling
    
    lastMousePosition.current = { x: e.clientX, y: e.clientY, timestamp: now };
    setMousePosition({ x: e.clientX, y: e.clientY });
    setIsVisible(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    // Add event listeners with passive flag for better performance
    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter, { passive: true });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [enabled, handleMouseMove, handleMouseLeave, handleMouseEnter]);

  useEffect(() => {
    if (!enabled || !isVisible) return;

    const animate = () => {
      setCardPosition(prev => {
        const targetX = mousePosition.x + offsetX;
        const targetY = mousePosition.y + offsetY;
        
        const newX = prev.x + (targetX - prev.x) * smoothness;
        const newY = prev.y + (targetY - prev.y) * smoothness;
        
        // Only update if there's a meaningful change to reduce re-renders
        if (Math.abs(newX - prev.x) < 0.1 && Math.abs(newY - prev.y) < 0.1) {
          return prev;
        }
        
        return { x: newX, y: newY };
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [mousePosition, offsetX, offsetY, smoothness, enabled, isVisible]);

  return (
    <div
      ref={cardRef}
      className={`${styles.mouseFollowingCard} ${className} ${isVisible ? styles.visible : styles.hidden}`}
      style={{
        transform: `translate3d(${cardPosition.x}px, ${cardPosition.y}px, 0)`,
        left: 0,
        top: 0
      }}
    >
      {children}
    </div>
  );
};

export default MouseFollowingCard;
