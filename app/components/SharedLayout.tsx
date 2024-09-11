"use client";

import { useEffect, useState, useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface Game {
  title: string;
  description: string;
  longDescription: string;
  image: string;
}

const GAMES: Game[] = [
  {
    title: "The Oddysey",
    description: "Explore unknown worlds and save the galaxy.",
    longDescription:
      "Throughout their journey, players will encounter diverse alien races, each with their own unique cultures and technologies. Engage in thrilling space combat, negotiate complex diplomatic relations, and make critical decisions that affect the balance of power in the galaxy.",
    image:
      "https://animations-on-the-web-git-how-i-use-3066e1-emilkowalski-s-team.vercel.app/how-i-use-framer-motion/how-i-code-animations/space.png",
  },
  {
    title: "Angry Rabbits",
    description: "They are coming for you.",
    longDescription:
      "The rabbits are angry and they are coming for you. You have to defend yourself with your carrot gun. The game is not simple, you have to be fast and accurate to survive.",
    image:
      "https://animations-on-the-web-git-how-i-use-3066e1-emilkowalski-s-team.vercel.app/how-i-use-framer-motion/how-i-code-animations/rabbit.png",
  },
  {
    title: "Ghost town",
    description: "Find the ghosts.",
    longDescription:
      "You are in a ghost town and you have to find the ghosts. But be careful, they are dangerous.",
    image:
      "https://animations-on-the-web-git-how-i-use-3066e1-emilkowalski-s-team.vercel.app/how-i-use-framer-motion/how-i-code-animations/ghost.webp",
  },
  {
    title: "Pirates in the jungle",
    description: "Find the treasure.",
    longDescription:
      "You are a pirate and you have to find the treasure in the jungle. But be careful, there are traps and wild animals.",
    image:
      "https://animations-on-the-web-git-how-i-use-3066e1-emilkowalski-s-team.vercel.app/how-i-use-framer-motion/how-i-code-animations/pirate.png",
  },
  {
    title: "Lost in the mountains",
    description: "Find your way home.",
    longDescription:
      "You are lost in the mountains and you have to find your way home. But be careful, there are dangerous animals and you can get lost.",
    image:
      "https://animations-on-the-web-git-how-i-use-3066e1-emilkowalski-s-team.vercel.app/how-i-use-framer-motion/how-i-code-animations/boy.webp",
  },
];

export default function SharedLayout() {
  const [activeGame, setActiveGame] = useState<Game | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => setActiveGame(null));

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActiveGame(null);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <AnimatePresence>
        {activeGame && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {activeGame && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <motion.div
              layoutId={`card-${activeGame.title}`}
              className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full"
              style={{ borderRadius: 12 }}
              ref={ref}>
              <div className="flex items-start mb-4">
                <motion.div
                  layoutId={`image-${activeGame.title}`}
                  className="mr-4">
                  <Image
                    src={activeGame.image}
                    alt={activeGame.title}
                    width={56}
                    height={56}
                    className="rounded-lg"
                    style={{ borderRadius: 12 }}
                  />
                </motion.div>
                <div className="flex-grow flex justify-between items-start">
                  <div>
                    <motion.h2
                      layoutId={`title-${activeGame.title}`}
                      className="text-xl font-bold">
                      {activeGame.title}
                    </motion.h2>
                    <motion.p
                      layoutId={`description-${activeGame.title}`}
                      className="text-gray-600 text-sm">
                      {activeGame.description}
                    </motion.p>
                  </div>
                  <motion.button
                    layoutId={`button-${activeGame.title}`}
                    className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition-colors">
                    Get
                  </motion.button>
                </div>
              </div>
              <motion.p
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.05 } }}
                className="text-gray-700">
                {activeGame.longDescription}
              </motion.p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <ul className="grid grid-cols-1 gap-4 max-w-2xl mx-auto">
        {GAMES.map((game) => (
          <motion.li
            layoutId={`card-${game.title}`}
            key={game.title}
            onClick={() => setActiveGame(game)}
            className="bg-white p-4 rounded-lg shadow cursor-pointer hover:shadow-md transition-shadow flex items-start"
            style={{ borderRadius: 8 }}>
            <motion.div
              layoutId={`image-${game.title}`}
              className="mr-4 relative w-14 h-14 flex-shrink-0">
              <Image
                src={game.image}
                alt={game.title}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
                style={{ borderRadius: 12 }}
              />
            </motion.div>
            <div className="flex-grow flex justify-between items-start">
              <div className="max-w-[70%]">
                <motion.h3
                  layoutId={`title-${game.title}`}
                  className="text-lg font-semibold mb-1 truncate">
                  {game.title}
                </motion.h3>
                <motion.p
                  layoutId={`description-${game.title}`}
                  className="text-gray-600 text-sm line-clamp-2">
                  {game.description}
                </motion.p>
              </div>
              <motion.button
                layoutId={`button-${game.title}`}
                className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition-colors flex-shrink-0">
                Get
              </motion.button>
            </div>
          </motion.li>
        ))}
      </ul>
    </>
  );
}
