export interface Emotion {
  id: string;
  name: string;
  description: string;
  difficulty: number;
}

export interface Level {
  id: number;
  name: string;
  description: string;
  style: "blackAndWhite" | "coloredCartoon" | "realistic";
  emotions: Emotion[];
}

export const levels: Level[] = [
  {
    id: 1,
    name: "Emoções Básicas",
    description:
      "Aprenda as emoções fundamentais em um estilo simples e divertido!",
    style: "blackAndWhite",
    emotions: [
      {
        id: "happy",
        name: "Feliz",
        description: "Expressão de alegria e contentamento",
        difficulty: 1,
      },
      {
        id: "sad",
        name: "Triste",
        description: "Expressão de tristeza e melancolia",
        difficulty: 1,
      },
      {
        id: "angry",
        name: "Raiva",
        description: "Expressão de irritação e fúria",
        difficulty: 1,
      },
      {
        id: "fear",
        name: "Medo",
        description: "Expressão de apreensão e susto",
        difficulty: 1,
      },
      {
        id: "disgust",
        name: "Nojo",
        description: "Expressão de repulsa e aversão",
        difficulty: 1,
      },
    ],
  },
  {
    id: 2,
    name: "Emoções Intermediárias",
    description:
      "Explore emoções mais complexas em um estilo colorido e cativante!",
    style: "coloredCartoon",
    emotions: [
      {
        id: "anxiety",
        name: "Ansiedade",
        description: "Expressão de preocupação e inquietação",
        difficulty: 2,
      },
      {
        id: "shame",
        name: "Vergonha",
        description: "Expressão de constrangimento",
        difficulty: 2,
      },
      {
        id: "shy",
        name: "Timidez",
        description: "Expressão de acanhamento",
        difficulty: 2,
      },
      {
        id: "surprise",
        name: "Surpresa",
        description: "Expressão de espanto e admiração",
        difficulty: 2,
      },
      {
        id: "love",
        name: "Apaixonado",
        description: "Expressão de amor e afeto",
        difficulty: 2,
      },
      {
        id: "envy",
        name: "Inveja",
        description: "Expressão de desejo pelo que outros têm",
        difficulty: 2,
      },
    ],
  },
  {
    id: 3,
    name: "Emoções Avançadas",
    description: "Domine as emoções mais sutis em um estilo realista!",
    style: "realistic",
    emotions: [
      {
        id: "jealousy",
        name: "Ciúmes",
        description: "Expressão de insegurança e possessividade",
        difficulty: 3,
      },
      {
        id: "pride",
        name: "Orgulho",
        description: "Expressão de satisfação e realização",
        difficulty: 3,
      },
      {
        id: "guilt",
        name: "Culpa",
        description: "Expressão de arrependimento",
        difficulty: 3,
      },
      {
        id: "admiration",
        name: "Admiração",
        description: "Expressão de respeito e fascínio",
        difficulty: 3,
      },
    ],
  },
];
