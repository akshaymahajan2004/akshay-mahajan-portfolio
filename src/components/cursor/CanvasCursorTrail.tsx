'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useCursor } from './CursorContext';

interface Point {
  x: number;
  y: number;
  age: number;
  maxAge: number;
  vx: number;
  vy: number;
  width: number;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
}

export const CanvasCursorTrail: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { cursorState } = useCursor();
  const [isDisabled, setIsDisabled] = useState(false);

  // Mouse & trail tracking state
  const mouseRef = useRef({ x: -100, y: -100, targetX: -100, targetY: -100, lastX: -100, lastY: -100, speed: 0 });
  const pointsRef = useRef<Point[]>([]);
  const ripplesRef = useRef<Ripple[]>([]);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    // Disable on touch devices or reduced motion preference
    const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (isTouch || reducedMotion) {
      setIsDisabled(true);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
    };

    const handleClick = (e: MouseEvent) => {
      ripplesRef.current.push({
        x: e.clientX,
        y: e.clientY,
        radius: 4,
        maxRadius: 28,
        opacity: 0.8
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    // Animation Loop
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mouse = mouseRef.current;

      // Smooth lerp follow (100-200ms visual lag)
      const lerpFactor = 0.22;
      mouse.x += (mouse.targetX - mouse.x) * lerpFactor;
      mouse.y += (mouse.targetY - mouse.y) * lerpFactor;

      const dx = mouse.x - mouse.lastX;
      const dy = mouse.y - mouse.lastY;
      const speed = Math.hypot(dx, dy);
      mouse.speed = speed;
      mouse.lastX = mouse.x;
      mouse.lastY = mouse.y;

      // Append new trail point if cursor has moved
      if (mouse.x > 0 && mouse.y > 0) {
        const isHoveringLink = cursorState === 'hover-link';
        const isHoveringProject = cursorState === 'hover-project';

        // Length & width dynamics based on velocity and state
        const maxAge = Math.min(24, Math.max(10, Math.floor(speed * 1.5) + 12));
        const baseWidth = isHoveringLink ? 2.5 : isHoveringProject ? 3.0 : 1.4;
        const width = Math.min(4.5, baseWidth + speed * 0.08);

        pointsRef.current.push({
          x: mouse.x,
          y: mouse.y,
          age: 0,
          maxAge: maxAge,
          vx: dx,
          vy: dy,
          width: width
        });
      }

      // Update and draw points
      const points = pointsRef.current;
      for (let i = points.length - 1; i >= 0; i--) {
        points[i].age += 1;
        if (points[i].age >= points[i].maxAge) {
          points.splice(i, 1);
        }
      }

      if (points.length > 1) {
        ctx.beginPath();
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        // Color based on hover state (Warm organic pencil/ink tones)
        const strokeColor = cursorState === 'hover-link'
          ? 'rgba(200, 90, 50, ' // Terracotta highlight
          : cursorState === 'hover-project'
          ? 'rgba(104, 112, 80, ' // Muted Olive
          : 'rgba(32, 32, 29, '; // Charcoal

        for (let i = 1; i < points.length; i++) {
          const p1 = points[i - 1];
          const p2 = points[i];
          const alpha = (1 - p2.age / p2.maxAge) * 0.7;

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);

          // Quadratic curve smoothing
          const midX = (p1.x + p2.x) / 2;
          const midY = (p1.y + p2.y) / 2;
          ctx.quadraticCurveTo(p1.x, p1.y, midX, midY);

          ctx.strokeStyle = `${strokeColor}${alpha})`;
          ctx.lineWidth = p2.width * (1 - p2.age / p2.maxAge * 0.5);
          ctx.stroke();
        }
      }

      // Render Hover Project Circle accent around cursor
      if (cursorState === 'hover-project' && mouse.x > 0) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 22, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(200, 90, 50, 0.4)';
        ctx.lineWidth = 1.2;
        ctx.setLineDash([4, 4]);
        ctx.stroke();
        ctx.restore();
      }

      // Render Click Ripples
      const ripples = ripplesRef.current;
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += 1.2;
        r.opacity -= 0.035;

        if (r.opacity <= 0 || r.radius >= r.maxRadius) {
          ripples.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(32, 32, 29, ${r.opacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [cursorState]);

  if (isDisabled) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50 transition-opacity duration-300"
      aria-hidden="true"
    />
  );
};
