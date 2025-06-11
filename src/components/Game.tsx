"use client";

import { useState, useEffect, useCallback } from "react";
import EmotionCard from "@/components/EmotionCard";
import { Level, Emotion } from "@/types/game";
import { motion } from "framer-motion";

interface GameProps {
  level: Level;
  onComplete: (score: number) => void;
}

export default function Game({ level, onComplete }: GameProps) {
  const [currentEmotion, setCurrentEmotion] = useState<Emotion | null>(null);
  const [options, setOptions] = useState<Emotion[]>([]);
  const [score, setScore] = useState(0);
  const [selectedEmotion, setSelectedEmotion] = useState<Emotion | null>(null);
  const [rounds, setRounds] = useState(0);
  const totalRounds = 5;
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [targetEmotions, setTargetEmotions] = useState<Emotion[]>([]);

  // Initialize target emotions for all rounds
  useEffect(() => {
    const shuffledEmotions = [...level.emotions].sort(
      () => Math.random() - 0.5
    );
    setTargetEmotions(shuffledEmotions.slice(0, totalRounds));
  }, [level.emotions]);

  const generateNewRound = useCallback(() => {
    if (!targetEmotions[rounds]) return;

    const targetEmotion = targetEmotions[rounds];
    const remainingEmotions = level.emotions.filter(
      (e) => e.id !== targetEmotion.id
    );
    const shuffledEmotions = [...remainingEmotions].sort(
      () => Math.random() - 0.5
    );
    const roundOptions = [targetEmotion, ...shuffledEmotions.slice(0, 3)].sort(
      () => Math.random() - 0.5
    );

    setCurrentEmotion(targetEmotion);
    setOptions(roundOptions);
    setSelectedEmotion(null);
  }, [level.emotions, rounds, targetEmotions]);

  useEffect(() => {
    if (rounds < totalRounds && targetEmotions.length > 0) {
      generateNewRound();
    } else if (rounds >= totalRounds) {
      onComplete(score);
    }
  }, [
    rounds,
    generateNewRound,
    onComplete,
    score,
    totalRounds,
    targetEmotions,
  ]);

  const handleSelect = (emotion: Emotion) => {
    if (selectedEmotion) return; // Prevent multiple selections while animating

    setSelectedEmotion(emotion);
    const correct = emotion.id === currentEmotion?.id;
    setIsCorrect(correct);
    setShowFeedback(true);

    setTimeout(() => {
      if (correct) {
        setScore(score + 1);
      }
      setShowFeedback(false);
      setTimeout(() => {
        setSelectedEmotion(null);
        setRounds(rounds + 1);
      }, 500);
    }, 1500);
  };

  const getFeedbackEmoji = (correct: boolean) => {
    if (correct) {
      const emojis = ["🎉", "⭐", "👏", "🌟", "✨"];
      return emojis[Math.floor(Math.random() * emojis.length)];
    }
    return "😮";
  };

  if (!currentEmotion) return null;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-8 text-center">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-4"
        >
          <h2 className="text-3xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
            Encontre a expressão:
          </h2>
          <p className="text-2xl font-bold text-gray-800 p-3 rounded-lg bg-gradient-to-r from-purple-100 to-pink-100">
            {currentEmotion.name}
          </p>
        </motion.div>

        <div className="flex items-center justify-between mb-4 bg-white rounded-xl p-4 shadow-md">
          <p className="text-xl font-bold text-gray-700">
            Rodada {rounds + 1} de {totalRounds}
          </p>
          <p className="text-xl font-bold text-purple-600">
            Pontuação: {score} {score > 0 ? "🌟" : ""}
          </p>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-4 mb-4 overflow-hidden shadow-inner">
          <motion.div
            className="h-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
            initial={{ width: 0 }}
            animate={{ width: `${(rounds / totalRounds) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 relative">
        {options.map((emotion) => (
          <EmotionCard
            key={emotion.id}
            emotion={emotion}
            style={level.style}
            onSelect={handleSelect}
            selected={selectedEmotion?.id === emotion.id}
          />
        ))}
      </div>

      {showFeedback && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="fixed inset-0 flex items-center justify-center pointer-events-none"
        >
          <motion.div
            initial={{ scale: 0.5, y: 0 }}
            animate={{
              scale: [1, 1.2, 1],
              y: [-50, -60, -50],
            }}
            transition={{
              duration: 1,
              times: [0, 0.5, 1],
              repeat: Infinity,
            }}
            className={`text-8xl ${isCorrect ? "drop-shadow-2xl" : ""}`}
          >
            {getFeedbackEmoji(isCorrect)}
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`absolute mt-24 text-2xl font-bold ${
              isCorrect ? "text-green-500" : "text-purple-500"
            }`}
          >
            {isCorrect ? "Muito bem!" : "Tente novamente!"}
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
