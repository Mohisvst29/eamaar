import React, { useState, useRef } from 'react';
import { SlidersHorizontal } from 'lucide-react';

export default function BeforeAfterSlider({ 
  beforeImage, 
  afterImage, 
  beforeLabel = "قبل الترميم", 
  afterLabel = "بعد التشطيب",
  title = "تحول إنشائي متكامل في فيلا الخبر" 
}) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  return (
    <div className="w-full flex flex-col gap-space-sm select-none">
      {title && (
        <div className="flex items-center justify-between">
          <span className="font-heading font-semibold text-base text-on-surface">
            {title}
          </span>
          <span className="text-xs text-on-surface-variant font-mono">
            اسحب المقبض لليمين أو اليسار للربط البصري
          </span>
        </div>
      )}

      <div
        ref={containerRef}
        className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-surface-container-high cursor-ew-resize border border-stone-border"
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
        onTouchStart={() => setIsDragging(true)}
        onTouchEnd={() => setIsDragging(false)}
        onTouchMove={handleTouchMove}
      >
        {/* After Image (Full width background) */}
        <img
          src={afterImage}
          alt={afterLabel}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4 bg-primary/90 text-on-primary px-3 py-1 text-xs font-semibold tracking-wider">
          {afterLabel}
        </div>

        {/* Before Image (Clipped overlay) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <img
            src={beforeImage}
            alt={beforeLabel}
            className="absolute inset-0 w-full h-full object-cover max-w-none"
            style={{ width: containerRef.current ? `${containerRef.current.offsetWidth}px` : '100%' }}
          />
          <div className="absolute top-4 right-4 bg-secondary text-on-secondary px-3 py-1 text-xs font-semibold tracking-wider">
            {beforeLabel}
          </div>
        </div>

        {/* Divider Bar & Handle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-secondary shadow-[0_0_10px_rgba(0,0,0,0.3)] cursor-ew-resize z-10"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 bg-primary text-secondary border-2 border-secondary flex items-center justify-center shadow-lg">
            <SlidersHorizontal className="w-5 h-5" />
          </div>
        </div>
      </div>
    </div>
  );
}
