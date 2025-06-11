"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Level, levels } from "@/types/game";
import Game from "@/components/Game";

interface GamePageProps {
  params: {
    id: string;
  };
}

export default function GamePage({ params }: GamePageProps) {
  const router = useRouter();
  const [level, setLevel] = useState<Level | null>(null);

  useEffect(() => {
    const levelId = parseInt(params.id);
    const currentLevel = levels.find((l) => l.id === levelId);

    if (!currentLevel) {
      router.push("/");
      return;
    }

    const highestLevel = localStorage.getItem("highestLevel");
    if (levelId > 1 && (!highestLevel || levelId > parseInt(highestLevel))) {
      router.push("/");
      return;
    }

    setLevel(currentLevel);
  }, [params.id, router]);

  const handleGameComplete = (score: number) => {
    const currentHighestLevel = localStorage.getItem("highestLevel");
    const levelId = parseInt(params.id);

    if (
      score >= 3 &&
      (!currentHighestLevel || levelId >= parseInt(currentHighestLevel))
    ) {
      localStorage.setItem("highestLevel", (levelId + 1).toString());
    }

    router.push("/game-complete");
  };

  if (!level) return null;

  return (
    <main className="min-h-screen p-8 bg-gradient-to-b from-purple-50 to-blue-50">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">{level.name}</h1>
          <p className="text-gray-600">{level.description}</p>
        </header>

        <Game level={level} onComplete={handleGameComplete} />
      </div>
    </main>
  );
}
