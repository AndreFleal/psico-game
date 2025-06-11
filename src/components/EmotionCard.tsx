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

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate={selected ? "selected" : "animate"}
      whileHover="hover"
      className={`relative p-3 rounded-2xl border-4 ${getStyleClasses(style)}`}
      onClick={() => onSelect(emotion)}
    >
      <div className="w-full aspect-square relative overflow-hidden rounded-xl transform transition-transform duration-300">
        <Image
          src={
            style === "blackAndWhite"
              ? emotion.id === "happy"
                ? "/emotions/blackAndWhite/criancafeliz.jpg"
                : emotion.id === "sad"
                ? "/emotions/blackAndWhite/criancatriste.jpg"
                : emotion.id === "angry"
                ? "/emotions/blackAndWhite/criancaraiva.jpg"
                : emotion.id === "fear"
                ? "/emotions/blackAndWhite/criancamedo.jpg"
                : emotion.id === "disgust"
                ? "/emotions/blackAndWhite/criancanojo.jpg"
                : `/emotions/${style}/${emotion.id}.svg`
              : `/emotions/${style}/${emotion.id}.svg`
          }
          alt={emotion.name}
          fill
          className="object-contain"
        />
      </div>
      {selected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg z-10"
        >
          ✓
        </motion.div>
      )}
    </motion.div>
  );
}
