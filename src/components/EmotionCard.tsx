"use client";

import { motion } from "framer-motion";
import { Emotion } from "@/types/game";
import Image from "next/image";

interface EmotionCardProps {
  emotion: Emotion;
  style: "blackAndWhite" | "coloredCartoon" | "realistic";
  onSelect: (emotion: Emotion) => void;
  selected?: boolean;
}

export default function EmotionCard({
  emotion,
  style,
  onSelect,
  selected,
}: EmotionCardProps) {
  const cardVariants = {
    initial: { scale: 0.9, opacity: 0, rotate: -5 },
    animate: {
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: { type: "spring", stiffness: 200, damping: 12 },
    },
    hover: {
      scale: 1.05,
      rotate: [0, -2, 2, 0],
      transition: {
        duration: 0.5,
        rotate: {
          repeat: Infinity,
          duration: 1,
        },
      },
    },
    selected: {
      scale: 1.1,
      rotate: 0,
      boxShadow: "0 0 0 4px #4CAF50",
      transition: { type: "spring", stiffness: 400, damping: 10 },
    },
  };

  const getStyleClasses = (style: EmotionCardProps["style"]) => {
    switch (style) {
      case "blackAndWhite":
        return "bg-gradient-to-br from-gray-50 to-white border-gray-300 shadow-lg hover:shadow-xl transition-shadow duration-300";
      case "coloredCartoon":
        return "bg-gradient-to-br from-blue-50 to-purple-50 border-blue-300 shadow-lg hover:shadow-xl transition-shadow duration-300";
      case "realistic":
        return "bg-gradient-to-br from-green-50 to-emerald-50 border-green-300 shadow-lg hover:shadow-xl transition-shadow duration-300";
      default:
        return "bg-gradient-to-br from-gray-50 to-white border-gray-300";
    }
  };

  const getEmotionColor = (emotionId: string) => {
    switch (emotionId) {
      case "happy":
        return "from-yellow-400 to-orange-400";
      case "sad":
        return "from-blue-400 to-indigo-400";
      case "angry":
        return "from-red-400 to-pink-400";
      case "fear":
        return "from-purple-400 to-violet-400";
      case "disgust":
        return "from-green-400 to-emerald-400";
      default:
        return "from-gray-400 to-gray-500";
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate={selected ? "selected" : "animate"}
      whileHover="hover"
      className={`relative p-6 rounded-2xl border-4 ${getStyleClasses(style)}`}
      onClick={() => onSelect(emotion)}
    >
      <div className="w-full aspect-square relative mb-4 overflow-hidden rounded-xl transform transition-transform duration-300">
        <Image
          src={`/emotions/${style}/${emotion.id}.svg`}
          alt={emotion.name}
          fill
          className={`object-contain p-4 ${
            style === "blackAndWhite" ? "grayscale" : ""
          }`}
        />
      </div>
      <div
        className={`rounded-full px-4 py-2 bg-gradient-to-r ${getEmotionColor(
          emotion.id
        )} transition-transform duration-300`}
      >
        <h4 className="text-xl font-bold text-center text-white drop-shadow-sm">
          {emotion.name}
        </h4>
      </div>

      {selected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg"
        >
          ✓
        </motion.div>
      )}
    </motion.div>
  );
}
