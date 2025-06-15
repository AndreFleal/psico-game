"use client";

import { useState, useEffect, useCallback } from "react";
import { Level, Emotion } from "@/types/game";
import { motion } from "framer-motion";
import Image from "next/image";

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
  const [roundId, setRoundId] = useState<string>(""); // ID único para cada rodada
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

    // Gerar novo ID para a rodada
    const newRoundId = Math.random().toString(36).substring(7);
    setRoundId(newRoundId);

    // Resetar estados
    setSelectedEmotion(null);
    setShowFeedback(false);
    setIsCorrect(false);

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
      setSelectedEmotion(null); // Reset seleção antes da próxima rodada

      // Pequeno atraso antes de mudar a rodada
      setTimeout(() => {
        setRounds(rounds + 1);
      }, 300);
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
    <div className="max-w-4xl mx-auto p-2 sm:p-4 lg:p-6">
      <div className="mb-4 sm:mb-6 lg:mb-8 text-center">
        {/* Barra de progresso e pontuação */}
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

      {/* Imagem central */}
      <div className="relative aspect-square w-80 h-80 mx-auto mb-8 rounded-[2rem] overflow-hidden">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-full h-full rounded-[2rem] overflow-hidden shadow-xl border-4 border-purple-300 bg-white"
        >
          <Image
            src={`/emotions/blackAndWhite/foto${
              currentEmotion?.id === "happy"
                ? "feliz"
                : currentEmotion?.id === "sad"
                ? "triste"
                : currentEmotion?.id === "angry"
                ? "raiva"
                : currentEmotion?.id === "fear"
                ? "medo"
                : currentEmotion?.id === "disgust"
                ? "nojo"
                : currentEmotion?.id === "anxiety"
                ? "ansiedade"
                : currentEmotion?.id === "shame"
                ? "vergonha"
                : currentEmotion?.id === "shy"
                ? "timidez"
                : currentEmotion?.id === "surprise"
                ? "surpresa"
                : currentEmotion?.id === "love"
                ? "apaixonado"
                : currentEmotion?.id === "envy"
                ? "inveja"
                : currentEmotion?.id === "jealousy"
                ? "ciumes"
                : currentEmotion?.id === "pride"
                ? "orgulho"
                : currentEmotion?.id === "guilt"
                ? "culpa"
                : currentEmotion?.id === "admiration"
                ? "admiracao"
                : currentEmotion?.id === "relief"
                ? "aliviado"
                : currentEmotion?.id
            }.jpeg`}
            alt="Que emoção é essa?"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
      </div>

      {/* Opções de emoções */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {options.map((emotion) => (
          <motion.button
            key={`${emotion.id}-${roundId}`} // Usar roundId para forçar recriação do componente
            variants={{
              initial: { scale: 0.9, opacity: 0 },
              animate: { scale: 1, opacity: 1 },
              hover: { scale: 1.05 },
              selected: {
                scale: 1.1,
                backgroundColor:
                  selectedEmotion?.id === emotion.id && isCorrect
                    ? "#4CAF50"
                    : "#FF5252",
              },
            }}
            initial="initial"
            animate={
              selectedEmotion?.id === emotion.id ? "selected" : "animate"
            }
            whileHover={selectedEmotion ? undefined : "hover"}
            onClick={() => !selectedEmotion && handleSelect(emotion)}
            className={`p-4 rounded-[1rem] text-lg font-bold transition-all
              ${
                selectedEmotion?.id === emotion.id
                  ? isCorrect
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                  : "bg-white hover:bg-purple-50 text-gray-800"
              }
              shadow-md hover:shadow-lg border-2 border-transparent
              ${!selectedEmotion ? "hover:border-purple-300" : ""}`}
          >
            {emotion.name}
          </motion.button>
        ))}
      </div>

      {/* Feedback animado */}
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
