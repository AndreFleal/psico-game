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
      onClick={() => onSelect(emotion)}
      className={`relative aspect-square rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer border-2 ${getStyleClasses(
        style
      )}`}
    >
      <Image
        src={`/emotions/${style}/crianca${emotion.id}.jpg`}
        alt={emotion.name}
        fill
        sizes="(max-width: 640px) 45vw, (max-width: 768px) 30vw, 25vw"
        className="object-cover w-full h-full transform transition-transform duration-300"
        priority
      />
    </motion.div>
  );
}
