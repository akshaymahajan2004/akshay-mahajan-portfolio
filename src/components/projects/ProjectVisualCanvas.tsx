'use client';

import React, { useEffect, useRef } from 'react';

interface ProjectVisualCanvasProps {
  visualType?: 'canvas-ai' | 'canvas-market' | 'canvas-audio' | 'canvas-editorial';
  isHovered?: boolean;
}

export const ProjectVisualCanvas: React.FC<ProjectVisualCanvasProps> = ({
  visualType = 'canvas-ai',
  isHovered = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const render = () => {
      time += isHovered ? 0.03 : 0.01;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // Warm paper canvas background fill
      ctx.fillStyle = '#E9E5DB';
      ctx.fillRect(0, 0, w, h);

      ctx.save();

      if (visualType === 'canvas-ai') {
        // AI Neural Node Net Animation
        const nodes = [
          { x: w * 0.25, y: h * 0.3 },
          { x: w * 0.5, y: h * 0.25 },
          { x: w * 0.75, y: h * 0.4 },
          { x: w * 0.35, y: h * 0.7 },
          { x: w * 0.65, y: h * 0.75 },
        ];

        ctx.strokeStyle = 'rgba(200, 90, 50, 0.4)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        nodes.forEach((n, i) => {
          const offsetX = Math.sin(time + i) * 6;
          const offsetY = Math.cos(time + i * 1.5) * 6;
          if (i === 0) ctx.moveTo(n.x + offsetX, n.y + offsetY);
          else ctx.lineTo(n.x + offsetX, n.y + offsetY);
        });
        ctx.closePath();
        ctx.stroke();

        // Node circles
        nodes.forEach((n, i) => {
          const offsetX = Math.sin(time + i) * 6;
          const offsetY = Math.cos(time + i * 1.5) * 6;
          ctx.beginPath();
          ctx.arc(n.x + offsetX, n.y + offsetY, isHovered ? 7 : 5, 0, Math.PI * 2);
          ctx.fillStyle = i % 2 === 0 ? '#C85A32' : '#20201D';
          ctx.fill();
        });

      } else if (visualType === 'canvas-editorial') {
        // Grid & Typography Composition
        ctx.strokeStyle = 'rgba(119, 115, 107, 0.3)';
        ctx.lineWidth = 1;

        // Grid lines
        for (let x = 20; x < w; x += 40) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, h);
          ctx.stroke();
        }

        // Animated bezier curves
        ctx.beginPath();
        ctx.moveTo(30, h * 0.7);
        ctx.bezierCurveTo(
          w * 0.3,
          h * 0.2 + Math.sin(time) * 15,
          w * 0.7,
          h * 0.9 + Math.cos(time) * 15,
          w - 30,
          h * 0.3
        );
        ctx.strokeStyle = '#20201D';
        ctx.lineWidth = 2.2;
        ctx.stroke();

      } else if (visualType === 'canvas-market') {
        // Telemetry chart wave
        ctx.beginPath();
        ctx.moveTo(0, h * 0.5);
        for (let x = 0; x <= w; x += 10) {
          const y = h * 0.5 + Math.sin(x * 0.03 + time * 2) * 25 + Math.cos(x * 0.01 + time) * 15;
          ctx.lineTo(x, y);
        }
        ctx.strokeStyle = '#687050';
        ctx.lineWidth = 2.5;
        ctx.stroke();

      } else {
        // Audio Waves / Concentric circles
        const centerX = w / 2;
        const centerY = h / 2;
        for (let r = 20; r < Math.min(w, h) / 2; r += 20) {
          const pulseR = r + Math.sin(time + r * 0.1) * 6;
          ctx.beginPath();
          ctx.arc(centerX, centerY, Math.max(2, pulseR), 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(140, 109, 88, 0.5)';
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      }

      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [visualType, isHovered]);

  return (
    <div className="w-full h-full min-h-[220px] relative overflow-hidden rounded-lg border border-fine-border/80">
      <canvas
        ref={canvasRef}
        width={480}
        height={320}
        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
      />
    </div>
  );
};
