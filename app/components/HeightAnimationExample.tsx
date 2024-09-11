"use client";

import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";

export default function HeightAnimationExample() {
  const [showExtraContent, setShowExtraContent] = useState(false);
  const [height, setHeight] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const rect = entry.target.getBoundingClientRect();
        setHeight(rect.height);
      }
    });

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full max-w-md mx-auto">
      <button
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        onClick={() => setShowExtraContent((b) => !b)}>
        Toggle height
      </button>
      <motion.div
        animate={{ height }}
        className="bg-white rounded-lg shadow-md overflow-hidden">
        <div ref={elementRef} className="p-4">
          <h1 className="text-xl font-bold mb-2">Fake Family Drawer</h1>
          <p className="mb-4">
            This is a fake family drawer. Animating height is tricky, but
            satisfying when it works.
          </p>
          {showExtraContent && (
            <p>
              This extra content will change the height of the drawer. Some even
              more content to make the drawer taller and taller and taller...
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
}
