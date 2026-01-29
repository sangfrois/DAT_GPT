// Paper data for the scrollytelling experience
export const paperMetadata = {
  title: "Divergent Creativity in Humans and Large Language Models",
  authors: ["Bellemare-Lespinasse", "et al."],
  arxivLink: "https://arxiv.org/abs/2405.13012",
  abstract: `In a computational creativity showdown, some LLMs top humans in generating diverse words but fall short in writing stories and poetry. The size of generative language models does not matter, plus humans still write more divergent haikus and synopses.`,
};

export const scrollSections = [
  {
    id: "intro",
    title: "The Creativity Challenge",
    content: `Can machines be creative? We tested dozens of Large Language Models against 100,000 humans on the Divergent Association Task (DAT)—a measure of creative thinking that asks participants to generate words as different from each other as possible.`,
    highlight: "100,000 humans vs. dozens of LLMs",
  },
  {
    id: "dat-explained",
    title: "The Divergent Association Task",
    content: `Participants must list 10 words that are as semantically distant as possible. The score is computed using GloVe word embeddings to measure the average cosine distance between word pairs. Higher scores indicate more divergent thinking.`,
    highlight: "10 words → semantic distance → creativity score",
  },
  {
    id: "findings-dat",
    title: "DAT Results",
    content: `GPT-4 and Claude models achieve scores comparable to or exceeding the human average (~78). However, this success doesn't tell the whole story. The most common human words (car, tree, dog) rarely appear in LLM responses—machines use more obscure vocabulary.`,
    highlight: "LLMs ≥ Humans on word diversity",
    visualization: "dat-comparison",
  },
  {
    id: "dsi-explained",
    title: "Beyond Words: Creative Writing",
    content: `We also measured Divergent Semantic Integration (DSI) in creative writing tasks: haikus, flash fiction, and film synopses. DSI captures how texts combine distant semantic concepts—a deeper measure of creativity.`,
    highlight: "Haiku • Flash Fiction • Synopses",
  },
  {
    id: "findings-dsi",
    title: "Writing Results",
    content: `Here, humans shine. Human-written haikus and synopses show significantly higher DSI scores than machine-generated text. LLMs tend toward semantic coherence, while human creativity embraces unexpected juxtapositions.`,
    highlight: "Humans > LLMs in creative writing",
    visualization: "dsi-comparison",
  },
  {
    id: "conclusion",
    title: "What This Means",
    content: `Creative divergence isn't one skill—it's many. LLMs excel at word-level diversity but struggle with the deeper semantic integration that characterizes human creative writing. Model size doesn't predict creativity; architecture and training matter more.`,
    highlight: "Creativity is multidimensional",
  },
];

// Sample DAT scores for visualization (representative data)
export const datScores = {
  humans: {
    label: "Human (100k)",
    mean: 78.5,
    std: 7.2,
    color: "#4D4D4D",
  },
  models: [
    { name: "GPT-4", mean: 82.1, std: 5.8, color: "#008080" },
    { name: "GPT-4o", mean: 81.5, std: 6.2, color: "#008080" },
    { name: "Claude 3.5", mean: 80.8, std: 5.5, color: "#FF8C00" },
    { name: "Gemini Pro", mean: 79.2, std: 6.8, color: "#1E90FF" },
    { name: "Llama 3", mean: 77.4, std: 7.1, color: "#6A0DAD" },
    { name: "Gemma 2", mean: 76.8, std: 6.9, color: "#1E90FF" },
    { name: "Bard", mean: 54.2, std: 5.1, color: "#1E90FF" },
  ],
};

// DSI comparison data
export const dsiScores = {
  tasks: ["Haiku", "Flash Fiction", "Synopsis"],
  human: [0.72, 0.68, 0.71],
  llm: [0.58, 0.64, 0.62],
};

// Most common words comparison
export const wordFrequency = {
  human: [
    { word: "car", percentage: 1.38 },
    { word: "dog", percentage: 1.24 },
    { word: "tree", percentage: 1.02 },
    { word: "cat", percentage: 0.79 },
    { word: "book", percentage: 0.70 },
  ],
  llm: [
    { word: "ephemeral", percentage: 0.85 },
    { word: "quagmire", percentage: 0.72 },
    { word: "labyrinth", percentage: 0.68 },
    { word: "chimera", percentage: 0.61 },
    { word: "zephyr", percentage: 0.58 },
  ],
};
