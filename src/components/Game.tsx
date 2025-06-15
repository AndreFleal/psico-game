"use client";

import { useState, useEffect, useCallback } from "react";
import { Level, Emotion } from "@/types/game";
import { motion, AnimatePresence } from "framer-motion";
import ReactConfetti from "react-confetti";
import { useWindowSize } from "react-use";
import Image from "next/image";

interface GameProps {
  level: Level;
  onComplete: () => void;
}

export default function Game({ level, onComplete }: GameProps) {
  const { width, height } = useWindowSize();
  const [currentEmotion, setCurrentEmotion] = useState<Emotion | null>(null);
  const [options, setOptions] = useState<Emotion[]>([]);
  const [score, setScore] = useState(0);
  const [selectedEmotion, setSelectedEmotion] = useState<Emotion | null>(null);
  const [rounds, setRounds] = useState(0);
  const [roundId, setRoundId] = useState(
    Math.random().toString(36).substring(7)
  );
  const totalRounds = 5;
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [targetEmotions, setTargetEmotions] = useState<Emotion[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);

  // Initialize target emotions for all rounds
  useEffect(() => {
    const shuffledEmotions = [...level.emotions].sort(
      () => Math.random() - 0.5
    );
    setTargetEmotions(shuffledEmotions.slice(0, totalRounds));
  }, [level.emotions]);

  const generateNewRound = useCallback(() => {
    if (!targetEmotions[rounds]) return;

    const newRoundId = Math.random().toString(36).substring(7);
    setRoundId(newRoundId);

    const targetEmotion = targetEmotions[rounds];

    // Filtrar as emoções baseado no nível atual
    const levelEmotions =
      level.id === 1
        ? level.emotions.filter((e) =>
            ["happy", "sad", "angry", "fear", "disgust"].includes(e.id)
          )
        : level.id === 2
        ? level.emotions.filter((e) =>
            ["anxiety", "shame", "shy", "surprise", "love", "envy"].includes(
              e.id
            )
          )
        : level.emotions.filter((e) =>
            ["jealousy", "pride", "guilt", "admiration"].includes(e.id)
          );

    // Embaralhar todas as emoções do nível atual
    const roundOptions = [...levelEmotions].sort(() => Math.random() - 0.5);

    setCurrentEmotion(targetEmotion);
    setOptions(roundOptions);
    setSelectedEmotion(null);
    setShowFeedback(false);
    setIsCorrect(false);
    setShowConfetti(false);
  }, [level.emotions, level.id, rounds, targetEmotions]);

  useEffect(() => {
    if (rounds < totalRounds && targetEmotions.length > 0) {
      generateNewRound();
    } else if (rounds >= totalRounds) {
      onComplete();
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
    if (selectedEmotion) return;

    setSelectedEmotion(emotion);
    const correct = emotion.id === currentEmotion?.id;
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      setShowConfetti(true);
    }

    setTimeout(() => {
      if (correct) {
        setScore(score + 1);
      }
      setShowFeedback(false);
      setShowConfetti(false);
      setTimeout(() => {
        setSelectedEmotion(null);
        setRounds(rounds + 1);
      }, 500);
    }, 2000);
  };

  const getFeedbackEmoji = (correct: boolean) => {
    if (correct) {
      const emojis = ["🎉", "⭐", "👏", "🌟", "✨", "🎈", "🎊", "💫"];
      return emojis[Math.floor(Math.random() * emojis.length)];
    }
    return "😮";
  };

  if (!currentEmotion) return null;

  return (
    <div className="max-w-4xl mx-auto p-4">
      {showConfetti && (
        <ReactConfetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={200}
          gravity={0.3}
          colors={["#FF69B4", "#FFD700", "#87CEEB", "#98FB98", "#DDA0DD"]}
        />
      )}

      <div className="mb-8 text-center">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-4"
        >
          <h2 className="text-3xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
            Qual é esta expressão?
          </h2>
        </motion.div>

        <motion.div
          key={currentEmotion.id}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="w-80 h-80 mx-auto mb-8 relative rounded-[2rem] overflow-hidden shadow-xl bg-white"
        >
          <Image
            src={
              level.style === "blackAndWhite" ||
              level.style === "coloredCartoon" ||
              level.style === "realistic"
                ? currentEmotion.id === "happy"
                  ? "/emotions/blackAndWhite/fotofeliz.jpeg"
                  : currentEmotion.id === "sad"
                  ? "/emotions/blackAndWhite/fototriste.jpeg"
                  : currentEmotion.id === "angry"
                  ? "/emotions/blackAndWhite/fotoraiva.jpeg"
                  : currentEmotion.id === "fear"
                  ? "/emotions/blackAndWhite/fotomedo.jpeg"
                  : currentEmotion.id === "disgust"
                  ? "/emotions/blackAndWhite/fotonojo.jpeg"
                  : currentEmotion.id === "anxiety"
                  ? "/emotions/blackAndWhite/fotoansiedade.jpeg"
                  : currentEmotion.id === "shame"
                  ? "/emotions/blackAndWhite/fotovergonha.jpeg"
                  : currentEmotion.id === "shy"
                  ? "/emotions/blackAndWhite/fototimidez.jpeg"
                  : currentEmotion.id === "surprise"
                  ? "/emotions/blackAndWhite/fotosurpresa.jpeg"
                  : currentEmotion.id === "love"
                  ? "/emotions/blackAndWhite/fotoapaixonado.jpeg"
                  : currentEmotion.id === "envy"
                  ? "/emotions/blackAndWhite/fotoinveja.jpeg"
                  : currentEmotion.id === "jealousy"
                  ? "/emotions/blackAndWhite/fotociumes.jpeg"
                  : currentEmotion.id === "pride"
                  ? "/emotions/blackAndWhite/fotoorgulho.jpeg"
                  : currentEmotion.id === "guilt"
                  ? "/emotions/blackAndWhite/fotoculpa.jpeg"
                  : currentEmotion.id === "admiration"
                  ? "/emotions/blackAndWhite/fotoadmiracao.jpeg"
                  : `/emotions/${level.style}/${currentEmotion.id}.svg`
                : `/emotions/${level.style}/${currentEmotion.id}.svg`
            }
            alt={currentEmotion.name}
            fill
            className="object-cover"
          />
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
            initial={{ width: "0%" }}
            animate={{ width: `${(rounds / totalRounds) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 relative">
        <AnimatePresence mode="wait">
          {options.map((emotion) => (
            <motion.button
              key={`${emotion.id}-${roundId}`}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSelect(emotion)}
              disabled={!!selectedEmotion}
              className={`p-3 rounded-xl text-base font-bold transition-colors duration-300 ${
                selectedEmotion
                  ? emotion.id === currentEmotion.id
                    ? "bg-green-500 text-white"
                    : selectedEmotion.id === emotion.id
                    ? "bg-red-500 text-white"
                    : "bg-gray-100 text-gray-400"
                  : "bg-white hover:bg-purple-50 text-gray-700 shadow-md hover:shadow-lg"
              }`}
            >
              {emotion.name}
            </motion.button>
          ))}
        </AnimatePresence>
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
              rotate: [0, -10, 10, 0],
            }}
            transition={{
              duration: 1.5,
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
              isCorrect
                ? "text-green-500 bg-white px-6 py-2 rounded-full shadow-lg"
                : "text-purple-500"
            }`}
          >
            {isCorrect ? "Muito bem!" : "Tente novamente!"}
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
