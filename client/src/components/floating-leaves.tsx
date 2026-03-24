import { useEffect, useState } from "react";

interface Leaf {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  opacity: number;
  rotation: number;
}

export function FloatingLeaves() {
  const [leaves, setLeaves] = useState<Leaf[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Generate random jasmine leaves
    const generateLeaves = () => {
      const newLeaves: Leaf[] = Array.from({ length: 12 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 3,
        duration: 10 + Math.random() * 6,
        size: 60 + Math.random() * 90,
        opacity: 0.25 + Math.random() * 0.35,
        rotation: Math.random() * 360,
      }));
      setLeaves(newLeaves);
    };

    generateLeaves();

    // Show leaves after a short delay
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {leaves.map((leaf) => (
        <div
          key={leaf.id}
          className="absolute"
          style={{
            left: `${leaf.left}%`,
            top: "-100px",
            width: `${leaf.size}px`,
            height: `${leaf.size * 1.8}px`,
            opacity: isVisible ? leaf.opacity : 0,
            animation: `leafFall ${leaf.duration}s linear ${leaf.delay}s infinite`,
            filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.15))",
          }}
        >
          <svg
            viewBox="0 0 60 120"
            className="w-full h-full text-green-600"
            fill="currentColor"
          >
            {/* Main leaf body - elongated jasmine leaf shape */}
            <path
              d="M 30 5 Q 45 20 48 40 Q 50 60 48 80 Q 45 100 30 115 Q 15 100 12 80 Q 10 60 12 40 Q 15 20 30 5 Z"
              fill="currentColor"
              opacity="0.9"
            />

            {/* Leaf highlight for depth */}
            <path
              d="M 30 10 Q 40 25 42 45 Q 43 65 40 85 Q 38 100 30 110"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
              opacity="0.4"
            />

            {/* Central vein */}
            <path
              d="M 30 5 Q 30 40 30 115"
              stroke="currentColor"
              strokeWidth="1"
              fill="none"
              opacity="0.5"
            />

            {/* Side veins - left */}
            <path
              d="M 25 25 Q 18 35 15 50"
              stroke="currentColor"
              strokeWidth="0.8"
              fill="none"
              opacity="0.3"
            />
            <path
              d="M 22 50 Q 14 65 12 80"
              stroke="currentColor"
              strokeWidth="0.8"
              fill="none"
              opacity="0.3"
            />

            {/* Side veins - right */}
            <path
              d="M 35 25 Q 42 35 45 50"
              stroke="currentColor"
              strokeWidth="0.8"
              fill="none"
              opacity="0.3"
            />
            <path
              d="M 38 50 Q 46 65 48 80"
              stroke="currentColor"
              strokeWidth="0.8"
              fill="none"
              opacity="0.3"
            />

            {/* Leaf tip detail */}
            <circle cx="30" cy="115" r="2" fill="currentColor" opacity="0.6" />
          </svg>
        </div>
      ))}
    </div>
  );
}
