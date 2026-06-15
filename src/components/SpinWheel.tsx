"use client";

import { useEffect, useRef, useState } from "react";
import { Restaurant } from "@/data/restaurants";

interface SpinWheelProps {
  restaurants: Restaurant[];
  onResult: (restaurant: Restaurant) => void;
}

export default function SpinWheel({ restaurants, onResult }: SpinWheelProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<Restaurant | null>(null);
  const angleRef = useRef(0);
  const velocityRef = useRef(0);
  const rafRef = useRef<number>(0);

  const sliceAngle = (2 * Math.PI) / restaurants.length;

  const draw = (angle: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const r = cx - 10;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    restaurants.forEach((rest, i) => {
      const start = angle + i * sliceAngle;
      const end = start + sliceAngle;

      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, r, start, end);
      ctx.closePath();
      ctx.fillStyle = rest.color;
      ctx.fill();
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(start + sliceAngle / 2);
      ctx.textAlign = "right";
      ctx.fillStyle = "#333";
      ctx.font = "bold 13px sans-serif";
      ctx.fillText(rest.name, r - 10, 5);
      ctx.restore();
    });

    // center circle
    ctx.beginPath();
    ctx.arc(cx, cy, 20, 0, 2 * Math.PI);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.strokeStyle = "#ccc";
    ctx.lineWidth = 2;
    ctx.stroke();

    // pointer
    ctx.beginPath();
    ctx.moveTo(cx + r + 10, cy);
    ctx.lineTo(cx + r - 10, cy - 12);
    ctx.lineTo(cx + r - 10, cy + 12);
    ctx.closePath();
    ctx.fillStyle = "#ef4444";
    ctx.fill();
  };

  useEffect(() => {
    draw(angleRef.current);
  }, [restaurants]);

  const spin = () => {
    if (spinning) return;
    setResult(null);
    setSpinning(true);
    velocityRef.current = 0.2 + Math.random() * 0.1;

    const animate = () => {
      angleRef.current += velocityRef.current;
      velocityRef.current *= 0.95;
      draw(angleRef.current);

      if (velocityRef.current > 0.005) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setSpinning(false);
        // pointer is at angle 0 (right side), figure out which slice it lands on
        const normalised = ((-(angleRef.current % (2 * Math.PI))) + 2 * Math.PI) % (2 * Math.PI);
        const idx = Math.floor(normalised / sliceAngle) % restaurants.length;
        const winner = restaurants[idx];
        setResult(winner);
        onResult(winner);
      }
    };
    rafRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={340}
          height={340}
          className="drop-shadow-lg"
        />
      </div>
      <button
        onClick={spin}
        disabled={spinning}
        className="px-8 py-3 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-bold rounded-full text-lg transition shadow-md"
      >
        {spinning ? "轉動中..." : "🎰 轉！"}
      </button>
      {result && (
        <div className="text-center animate-bounce">
          <p className="text-2xl font-bold text-orange-600">🎉 {result.name}</p>
          <p className="text-sm text-gray-500">{result.address} · 步行{result.walkingMinutes}分鐘</p>
        </div>
      )}
    </div>
  );
}
