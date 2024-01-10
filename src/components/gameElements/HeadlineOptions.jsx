import React, { useState, useEffect } from "react";

export default function HeadlineOptions({ articles }) {
  const [words, setWords] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (articles && articles.length > 0) {
      try {
        // Extracting words from the headlines of the articles
        const allWords = articles.flatMap((article) =>
          article.title
            .split(/(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?)\s|[\s,]+/)
            .filter(Boolean)
        );

        const shuffledWords = shuffleArray([...new Set(allWords)]);
        const wordsWithIds = shuffledWords.map((word, index) => ({
          id: `word-${index}`,
          word,
        }));
        setWords(wordsWithIds);
      } catch (err) {
        setError("Failed to process headlines");
      }
    }
  }, [articles]);

  function shuffleArray(array) {
    let currentIndex = array.length,
      randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  }

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex flex-col gap-2 p-4">
      <div className="font-bold">Headline Options</div>
      <div className="flex flex-wrap gap-2">
        {words.map(({ id, word }) => (
          <div key={id} className="p-2 bg-blue-200 rounded shadow">
            {word}
          </div>
        ))}
      </div>
    </div>
  );
}
