"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Level, levels } from "@/types/game";
import Game from "@/components/Game";

interface GamePageProps {
  params: Promise<{ id: string }> & { id: string };
}

export default function GamePage({ params }: GamePageProps) {
  const router = useRouter();
  const [level, setLevel] = useState<Level | null>(null);
  const unwrappedParams = React.use(params);

  useEffect(() => {
    const levelId = Number(unwrappedParams.id);
    const currentLevel = levels.find((l) => l.id === levelId);

    if (!currentLevel) {
      router.push("/");
      return;
    }

    setLevel(currentLevel);
  }, [unwrappedParams.id, router]);

  const handleGameComplete = () => {
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
