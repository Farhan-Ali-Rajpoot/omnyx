'use client';
import { useRef, useEffect, useState } from 'react';

interface BoldSVGTextProps {
  label: string;
  strokeThickness?: number;
  className?: string; 
}

export function BoldSVGText({ 
  label, 
  strokeThickness = 1, 
  className = "" 
}: BoldSVGTextProps) {
  const textRef = useRef<SVGTextElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (textRef.current) {
      const bbox = textRef.current.getBBox();
      // Add stroke thickness to ensure stroke isn't cut off
      const padding = strokeThickness;
      setDimensions({
        width: bbox.width + padding * 2,
        height: bbox.height + padding * 2
      });
    }
  }, [label, strokeThickness]);

  return (
    <svg 
      // Dynamically set viewBox based on text measurements
      viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
      width={dimensions.width}
      height={dimensions.height}
      className={`inline-block leading-none align-baseline ${className}`}
      style={{ 
        display: 'inline-block',
        lineHeight: 0,
        verticalAlign: 'middle',
        overflow: 'visible' // Ensure stroke isn't clipped
      }}
    >
      <text
        ref={textRef}
        // Position text with padding for stroke
        x={strokeThickness}
        y={dimensions.height / 2}
        dominantBaseline="middle"
        textAnchor="start"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={strokeThickness}
        strokeLinejoin="round"
        style={{ 
          vectorEffect: 'non-scaling-stroke',
          paintOrder: 'stroke fill',
          lineHeight: 1
        }}
      >
        {label}
      </text>
    </svg>
  );
}