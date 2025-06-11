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
        return "bg-gradient-to-br from-gray-100 to-white border-gray-400 shadow-lg hover:shadow-xl transition-shadow duration-300";
      case "coloredCartoon":
        return "bg-gradient-to-br from-blue-100 to-purple-100 border-blue-400 shadow-lg hover:shadow-xl transition-shadow duration-300";
      case "realistic":
        return "bg-gradient-to-br from-green-100 to-emerald-100 border-green-400 shadow-lg hover:shadow-xl transition-shadow duration-300";
      default:
        return "bg-gradient-to-br from-gray-100 to-white border-gray-400";
    }
  };

  const getEmotionColor = (emotionId: string) => {
    switch (emotionId) {
      case "happy":
        return "from-yellow-500 to-orange-500";
      case "sad":
        return "from-blue-500 to-indigo-600";
      case "angry":
        return "from-red-500 to-pink-600";
      case "fear":
        return "from-purple-500 to-violet-600";
      case "disgust":
        return "from-green-500 to-emerald-600";
      default:
        return "from-gray-600 to-gray-700";
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
        className={`rounded-full px-4 py-3 bg-gradient-to-r ${getEmotionColor(
          emotion.id
        )} transition-transform duration-300 shadow-lg`}
      >
        <h4 className="text-2xl font-black text-center text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">
          {emotion.name}
        </h4>
      </div>
    </motion.div>
  );
}
