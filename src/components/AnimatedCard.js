import React, { useRef, useEffect } from 'react';

const AnimatedCard = ({ title, children, className, icon }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Calculate distance from center for a more dynamic effect
      const offsetX = (x - centerX) / 30;
      const offsetY = (y - centerY) / 30;

      // Apply the slight 3D effect with scaling and shadow
      card.style.transform = `scale(1.05) translate3d(${offsetX}px, ${offsetY}px, 0)`;
      card.style.boxShadow = `${offsetX * 2}px ${offsetY * 2}px 10px rgba(0, 0, 0, 0.1)`;
    };

    const handleMouseLeave = () => {
      card.style.transform = 'scale(1) translate3d(0, 0, 0)';
      card.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div ref={cardRef} className={`animated-card ${className || ''}`}>
      {title && (
        <h3 className="card-title">
          {icon && <span className="card-icon">{icon}</span>}
          {title}
        </h3>
      )}
      {children}
    </div>
  );
};

export default AnimatedCard;
