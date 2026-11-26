import { useEffect, useRef, useState } from 'react';
import createGlobe from 'cobe';

// Bodrum ve iş yapılan yerler (enlem, boylam).
const BODRUM = [37.03, 27.43];
const PLACES = [
  [36.75, 28.94], // Göcek
  [36.85, 28.27], // Marmaris
  [37.10, 27.29], // Yalıkavak
  [41.01, 28.98], // İstanbul
  [36.85, 30.71], // Antalya
];

/** Dönen noktalı küre; WebGL yoksa ya da azaltılmış harekette CSS yedeği görünür kalır. */
export default function Globe() {
  const canvasRef = useRef(null);
  const [ok, setOk] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let globe;
    let frame;
    let phi = 4.35; // Türkiye ekrana dönük başlasın
    try {
      const size = canvas.offsetWidth;
      globe = createGlobe(canvas, {
        devicePixelRatio: 2,
        width: size * 2,
        height: size * 2,
        phi,
        theta: 0.38,
        dark: 1,
        diffuse: 1.2,
        mapSamples: 14000,
        mapBrightness: 5,
        baseColor: [0.25, 0.27, 0.32],
        markerColor: [1, 0.74, 0.18],
        glowColor: [0.22, 0.4, 0.95],
        markers: [{ location: BODRUM, size: 0.09 }, ...PLACES.map((p) => ({ location: p, size: 0.04 }))],
        arcs: PLACES.map((p) => ({ from: BODRUM, to: p })),
        arcColor: [0.45, 0.7, 1],
        arcWidth: 0.6,
        arcHeight: 0.25,
      });
      setOk(true);
      if (!reduce) {
        const tick = () => {
          phi += 0.0035;
          globe.update({ phi });
          frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      }
    } catch {
      setOk(false);
    }
    return () => {
      cancelAnimationFrame(frame);
      globe?.destroy();
    };
  }, []);

  return (
    <div className={`globe${ok ? ' is-ready' : ''}`}>
      <div className="globe-fallback" aria-hidden="true" />
      <canvas ref={canvasRef} aria-hidden="true" />
    </div>
  );
}
