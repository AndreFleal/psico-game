"use client";

import { motion } from "framer-motion";
import { Level } from "@/types/game";
import { useRouter } from "next/navigation";

interface LevelCardProps {
  level: Level;
}

export default function LevelCard({ level }: LevelCardProps) {
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
        return "bg-gradient-to-br from-purple-300 to-pink-300 border-purple-400 shadow-lg shadow-purple-300/50";
      case "coloredCartoon":
        return "bg-gradient-to-br from-blue-300 to-green-300 border-blue-400 shadow-lg shadow-blue-300/50";
      case "realistic":
        return "bg-gradient-to-br from-yellow-300 to-orange-300 border-yellow-400 shadow-lg shadow-yellow-300/50";
      default:
        return "bg-gradient-to-br from-gray-300 to-gray-400 border-gray-400";
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      className={`relative p-6 rounded-2xl border-2 ${getStyleClasses(
        level.style
      )} cursor-pointer`}
      onClick={() => router.push(`/game/${level.id}`)}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold bg-white px-4 py-2 rounded-lg shadow-sm text-gray-800">
          {level.name} {getLevelEmoji(level.id)}
        </h2>
      </div>
      <p className="text-gray-800 font-medium bg-white/80 rounded-lg p-3 backdrop-blur-sm shadow-sm">
        {level.description}
      </p>
    </motion.div>
  );
}
