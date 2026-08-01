'use client';
import React, { useEffect, useRef } from 'react';

export default function BezierCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const retina = typeof window !== 'undefined' && window.devicePixelRatio > 1;
    let pxlRatio = retina ? 2 : 1;
    if (
      typeof navigator !== 'undefined' &&
      (navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPhone/i))
    ) {
      pxlRatio = 1.5;
    }

    const settings = {
      maxStyles: 3,
      maxLines: 80,
      strokeWidth: 0.5,
      lineSpacing: 0.07,
      spacingVariation: 0.07,
      colorBase: { r: 100, g: 120, b: 200 },
      colorVariation: { r: 50, g: 50, b: 50 },
      globalSpeed: 200,
      globalAlpha: 0.4,
      delayVariation: 4,
      moveCenterX: 0,
      moveCenterY: 0,
      coordinates: [],
    };

    let width = window.innerWidth;
    let height = window.innerHeight;

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      canvas.width = width * pxlRatio;
      canvas.height = height * pxlRatio;
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const objects = [];
    const styles = [];

    for (let c = 0; c < settings.maxStyles; c++) {
      styles.push({
        cR: Math.round(settings.colorBase.r + Math.random() * settings.colorVariation.r),
        cG: Math.round(settings.colorBase.g + Math.random() * settings.colorVariation.g),
        cB: Math.round(settings.colorBase.b + Math.random() * settings.colorVariation.b),
        line: settings.strokeWidth * pxlRatio,
      });
      objects[c] = [];
    }

    for (let k = 0; k < settings.maxLines; k++) {
      const hm = Math.random();
      const color = Math.floor(Math.random() * settings.maxStyles);
      objects[color].push({
        speed: settings.delayVariation * hm + 0.1,
        pos: (k * settings.lineSpacing + settings.spacingVariation * hm) * pxlRatio,
      });
    }

    if (settings.coordinates.length === 0) {
      const plusminus = 0.5 - Math.random();
      const plusminus2 = 0.5 - Math.random();
      const m = plusminus > 0 ? Math.ceil(plusminus) : Math.floor(plusminus);
      const m2 = plusminus2 > 0 ? Math.ceil(plusminus2) : Math.floor(plusminus2);

      settings.coordinates.push({
        x1: (m * canvas.width) / 2,
        y1: (m2 * canvas.height) / 3,
        x2: Math.random() * canvas.width - canvas.width / 2,
        y2: Math.random() * canvas.height - canvas.height / 2,
        x3: Math.random() * canvas.width - canvas.width / 2,
        y3: Math.random() * canvas.height - canvas.height / 2,
        x4: (-m * canvas.width) / 2,
        y4: (-m2 * canvas.height) / 3,
        kx1: 15,
        ky1: 15 * Math.random(),
        kx2: 15,
        ky2: 15,
      });
    }

    const addPoints = () => {
      const p = settings.coordinates[settings.coordinates.length - 1];
      const plusminus2 = 0.7 - Math.random();
      const m = p.x4 < 0 ? -1 : 1;
      const m2 = p.y4 < 0 ? -1 : 1;
      const m3 = plusminus2 > 0 ? Math.ceil(plusminus2) : Math.floor(plusminus2);

      settings.coordinates.push({
        x1: p.x4,
        y1: p.y4,
        x2: p.x4 + (p.x4 - p.x3),
        y2: p.y4 + (p.y4 - p.y3),
        x3: Math.random() * canvas.width - canvas.width / 2,
        y3: Math.random() * canvas.height - canvas.height / 2,
        x4: -m * (canvas.width / 4 + Math.round(Math.random() - 0.2) * (canvas.height / 4)),
        y4: -m2 * m3 * (canvas.height / 4 + Math.round(Math.random() - 0.2) * (canvas.height / 4)),
        kx1: p.kx2,
        ky1: p.ky2,
        kx2: 15 - 30 * Math.random(),
        ky2: 15 - 30 * Math.random(),
      });
    };

    const segmentPoints = (u0, u1, t0, t1, xP1, yP1, xP2, yP2, xP3, yP3, xP4, yP4) => {
      return {
        x1: u0 * u0 * u0 * xP1 + (t0 * u0 * u0 + u0 * t0 * u0 + u0 * u0 * t0) * xP2 + (t0 * t0 * u0 + u0 * t0 * t0 + t0 * u0 * t0) * xP3 + t0 * t0 * t0 * xP4,
        x2: u0 * u0 * u1 * xP1 + (t0 * u0 * u1 + u0 * t0 * u1 + u0 * u0 * t1) * xP2 + (t0 * t0 * u1 + u0 * t0 * t1 + t0 * u0 * t1) * xP3 + t0 * t0 * t1 * xP4,
        x3: u0 * u1 * u1 * xP1 + (t0 * u1 * u1 + u0 * t1 * u1 + u0 * u1 * t1) * xP2 + (t0 * t1 * u1 + u0 * t1 * t1 + t0 * u1 * t1) * xP3 + t0 * t1 * t1 * xP4,
        x4: u1 * u1 * u1 * xP1 + (t1 * u1 * u1 + u1 * t1 * u1 + u1 * u1 * t1) * xP2 + (t1 * t1 * u1 + u1 * t1 * t1 + t1 * u1 * t1) * xP3 + t1 * t1 * t1 * xP4,
        y1: u0 * u0 * u0 * yP1 + (t0 * u0 * u0 + u0 * t0 * u0 + u0 * u0 * t0) * yP2 + (t0 * t0 * u0 + u0 * t0 * t0 + t0 * u0 * t0) * yP3 + t0 * t0 * t0 * yP4,
        y2: u0 * u0 * u1 * yP1 + (t0 * u0 * u1 + u0 * t0 * u1 + u0 * u0 * t1) * yP2 + (t0 * t0 * u1 + u0 * t0 * t1 + t0 * u0 * t1) * yP3 + t0 * t0 * t1 * yP4,
        y3: u0 * u1 * u1 * yP1 + (t0 * u1 * u1 + u0 * t1 * u1 + u0 * u1 * t1) * yP2 + (t0 * t1 * u1 + u0 * t1 * t1 + t0 * u1 * t1) * yP3 + t0 * t1 * t1 * yP4,
        y4: u1 * u1 * u1 * yP1 + (t1 * u1 * u1 + u1 * t1 * u1 + u1 * u1 * t1) * yP2 + (t1 * t1 * u1 + u1 * t1 * t1 + t1 * u1 * t1) * yP3 + t1 * t1 * t1 * yP4,
      };
    };

    const startTime = new Date().getTime();

    const draw = () => {
      const now = new Date().getTime();
      const dt = now - startTime;

      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.translate(canvas.width / 2 + settings.moveCenterX, canvas.height / 2 + settings.moveCenterY);

      for (let c = 0; c < styles.length; c++) {
        ctx.beginPath();
        ctx.lineWidth = styles[c].line;
        ctx.strokeStyle = `rgba(${styles[c].cR}, ${styles[c].cG}, ${styles[c].cB}, ${settings.globalAlpha})`;

        for (let j = 0; j < objects[c].length; j++) {
          const gt0 = dt / 10 / settings.globalSpeed - objects[c][j].speed - 1;
          const gt1 = dt / 10 / settings.globalSpeed - objects[c][j].speed;
          const l = Math.floor(Math.max(gt0, 0));
          const cl = l;

          if (settings.coordinates.length <= l) {
            addPoints();
          }

          const t0 = gt0 - l;
          const t1 = gt1 - l;
          const u0 = 1.0 - Math.min(t0, 1);
          const u1 = 1.0 - Math.min(t1, 1);

          if (typeof settings.coordinates[cl] === 'undefined') break;

          const p = segmentPoints(
            u0,
            u1,
            Math.min(t0, 1),
            Math.min(t1, 1),
            settings.coordinates[cl].x1 + objects[c][j].pos * settings.coordinates[cl].kx1,
            settings.coordinates[cl].y1 + objects[c][j].pos * settings.coordinates[cl].ky1,
            settings.coordinates[cl].x2 + objects[c][j].pos * settings.coordinates[cl].kx1,
            settings.coordinates[cl].y2 + objects[c][j].pos * settings.coordinates[cl].ky1,
            settings.coordinates[cl].x3 + objects[c][j].pos * settings.coordinates[cl].kx2,
            settings.coordinates[cl].y3 + objects[c][j].pos * settings.coordinates[cl].kx2,
            settings.coordinates[cl].x4 + objects[c][j].pos * settings.coordinates[cl].kx2,
            settings.coordinates[cl].y4 + objects[c][j].pos * settings.coordinates[cl].ky2
          );

          ctx.moveTo(p.x1, p.y1);
          ctx.bezierCurveTo(p.x2, p.y2, p.x3, p.y3, p.x4, p.y4);
        }
        ctx.stroke();
      }

      ctx.restore();
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="bg-canvas"
      style={{
        margin: 0,
        padding: 0,
        border: 0,
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1,
        pointerEvents: 'none',
      }}
    />
  );
}
