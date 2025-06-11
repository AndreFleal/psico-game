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
        return "bg-gradient-to-br from-purple-100 to-pink-100 border-purple-300 shadow-lg shadow-purple-200/50";
      case "coloredCartoon":
        return "bg-gradient-to-br from-blue-100 to-green-100 border-blue-300 shadow-lg shadow-blue-200/50";
      case "realistic":
        return "bg-gradient-to-br from-yellow-100 to-orange-100 border-yellow-300 shadow-lg shadow-yellow-200/50";
      default:
        return "bg-gradient-to-br from-gray-100 to-gray-200 border-gray-300";
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
      <div className="flex items-center gap-3 mb-3">
        <span className="text-4xl">{getLevelEmoji(level.id)}</span>
        <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
          {level.name}
        </h3>
      </div>
      <p className="text-gray-700 mb-4 text-lg">{level.description}</p>
      <div className="flex flex-wrap gap-2">
        {level.emotions.map((emotion) => (
          <span
            key={emotion.id}
            className="inline-block px-4 py-2 text-base rounded-full bg-white/70 shadow-sm border-2 border-white/80 font-medium hover:scale-105 transition-transform"
          >
            {emotion.name}
          </span>
        ))}
      </div>
      {!isUnlocked && (
        <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-white/80 backdrop-blur-sm">
          <div className="text-center">
            <span className="text-4xl mb-2 block animate-bounce">🔒</span>
            <span className="text-purple-700 font-bold text-lg px-4 py-2 rounded-full bg-purple-100">
              Complete o nível anterior primeiro!
            </span>
          </div>
        </div>
      )}
    </motion.div>
  );
}
