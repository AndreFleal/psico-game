"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function GameComplete() {
  const router = useRouter();

  return (
    <main className="min-h-screen p-8 bg-gradient-to-b from-purple-50 to-blue-50">
      <div className="max-w-md mx-auto text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl p-8 shadow-lg"
        >
          <h1 className="text-3xl font-bold mb-4">🎉 Parabéns!</h1>
          <p className="text-gray-600 mb-6">
            Você completou este nível! Continue praticando para melhorar seu
            reconhecimento de emoções.
          </p>

          <div className="space-y-4">
            <button
              onClick={() => router.push("/")}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity"
            >
              Voltar ao Menu
            </button>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
