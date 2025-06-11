"use client";

import { levels } from "@/types/game";
import LevelCard from "@/components/LevelCard";
import { useEffect, useState } from "react";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="min-h-screen p-8 bg-gradient-to-b from-purple-50 to-blue-50">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
            Jogo das Expressões
          </h1>
          <p className="text-gray-600 text-lg">
            Aprenda a reconhecer diferentes emoções em um jogo divertido e
            desafiador!
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mounted &&
            levels.map((level, index) => (
              <LevelCard
                key={level.id}
                level={level}
                isUnlocked={
                  index === 0 ||
                  Number(localStorage.getItem("highestLevel")) >= index
                }
              />
            ))}
        </div>
      </div>
    </main>
  );
}
