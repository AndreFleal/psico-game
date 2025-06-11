"use client";

import { motion } from "framer-motion";
import { Level } from "@/types/game";
import { useRouter } from "next/navigation";

interface LevelCardProps {
  level: Level;
  isUnlocked: boolean;
}

export default function LevelCard({ level, isUnlocked }: LevelCardProps) {
  const router = useRouter();

  const cardVariants = {
    initial: { scale: 0.9, opacity: 0, y: 20 },
    animate: { scale: 1, opacity: 1, y: 0 },
    hover: {
      scale: 1.05,
      y: -5,
      transition: {
        duration: 0.3,
        yoyo: Infinity,
        repeat: 1,
      },
    },
  };

  const getLevelEmoji = (id: number) => {
    switch (id) {
      case 1:
        return "👶";
      case 2:
        return "🧒";
      case 3:
        return "🎓";
      default:
        return "⭐";
    }
  };

  const getStyleClasses = (style: Level["style"]) => {
    switch (style) {
      case "blackAndWhite":
        return "bg-gradient-to-br from-purple-200 to-pink-200 border-purple-400 shadow-lg shadow-purple-300/50";
      case "coloredCartoon":
        return "bg-gradient-to-br from-blue-200 to-green-200 border-blue-400 shadow-lg shadow-blue-300/50";
      case "realistic":
        return "bg-gradient-to-br from-yellow-200 to-orange-200 border-yellow-400 shadow-lg shadow-yellow-300/50";
      default:
        return "bg-gradient-to-br from-gray-200 to-gray-300 border-gray-400";
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover={isUnlocked ? "hover" : undefined}
      className={`relative p-6 rounded-2xl border-4 ${getStyleClasses(
        level.style
      )} ${isUnlocked ? "cursor-pointer" : "opacity-70 cursor-not-allowed"}`}
      onClick={() => isUnlocked && router.push(`/game/${level.id}`)}
    >
      <div className="flex items-center gap-3 mb-4">
        <span className="text-5xl drop-shadow-md">
          {getLevelEmoji(level.id)}
        </span>
        <h3 className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-pink-700 drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
          {level.name}
        </h3>
      </div>
      <p className="text-gray-800 mb-5 text-lg font-medium">
        {level.description}
      </p>
      <div className="flex flex-wrap gap-2">
        {level.emotions.map((emotion) => (
          <span
            key={emotion.id}
            className="inline-block px-4 py-2 text-base rounded-full bg-white/90 shadow-md border-2 border-white font-bold text-gray-700 hover:scale-105 transition-transform"
          >
            {emotion.name}
          </span>
        ))}
      </div>
      {!isUnlocked && (
        <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-white/90 backdrop-blur-sm">
          <div className="text-center">
            <span className="text-5xl mb-3 block animate-bounce drop-shadow-lg">
              🔒
            </span>
            <span className="text-purple-800 font-black text-lg px-6 py-3 rounded-full bg-purple-100 shadow-md border-2 border-purple-200">
              Complete o nível anterior primeiro!
            </span>
          </div>
        </div>
      )}
    </motion.div>
  );
}
