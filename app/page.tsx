"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckIcon, CopyIcon } from "lucide-react";

const variants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1 },
};

const buttonCopy = {
  idle: "Send me a login link",
  loading: <Spinner size={16} color="rgba(255, 255, 255, 0.65)" />,
  success: "Login link sent!",
};

function Spinner({ color, size = 20 }: { color: string; size?: number }) {
  const bars = Array(12).fill(0);
  return (
    <div
      className="wrapper"
      style={
        {
          "--spinner-size": `${size}px`,
          "--spinner-color": color,
        } as React.CSSProperties
      }>
      <div className="spinner">
        {bars.map((_, i) => (
          <div className="bar" key={`spinner-bar-${i}`} />
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const [copied, setCopied] = useState(false);
  const [buttonState, setButtonState] = useState<
    "idle" | "loading" | "success"
  >("idle");

  const copy = () => {
    setCopied(true);
    // Add your copy logic here
    setTimeout(() => setCopied(false), 1500); // Reset after 1.5 seconds
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 gap-8">
      <button
        aria-label="Copy code snippet"
        onClick={copy}
        className="p-2 rounded-md bg-gray-50 border border-gray-200 hover:bg-gray-100 hover:border-gray-300 transition-colors shadow-sm">
        <AnimatePresence mode="wait" initial={false}>
          {copied ? (
            <motion.span
              key="checkmark"
              variants={variants}
              initial="hidden"
              animate="visible"
              exit="hidden">
              <CheckIcon className="w-6 h-6 text-green-500" />
            </motion.span>
          ) : (
            <motion.span
              key="copy"
              variants={variants}
              initial="hidden"
              animate="visible"
              exit="hidden">
              <CopyIcon className="w-6 h-6 text-gray-600" />
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      <div className="outer-wrapper">
        <button
          className="blue-button"
          disabled={buttonState !== "idle"}
          onClick={() => {
            setButtonState("loading");

            setTimeout(() => {
              setButtonState("success");
            }, 1750);

            setTimeout(() => {
              setButtonState("idle");
            }, 3500);
          }}>
          <span>{buttonCopy[buttonState]}</span>
        </button>
      </div>
    </main>
  );
}
