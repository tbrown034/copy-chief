import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function HeadlineOptions({ articles }) {
  const [words, setWords] = useState([]);
  const [sorted, setSorted] = useState(false); // Track if the words are sorted
  const [error, setError] = useState(null);

  useEffect(() => {
    if (articles && articles.length > 0) {
      try {
        // Extracting words from the headlines of the articles
        const allWords = articles.flatMap((article) =>
          article.title
            .split(/(?<!\w\.\w.)(?<![A-Z][a.z]\.)(?<=\.|\?)\s|[\s,]+/)
            .filter(Boolean)
        );

        // Remove duplicates and shuffle
        const uniqueWords = [...new Set(allWords)];
        const wordsWithIds = uniqueWords.map((word, index) => ({
          id: `word-${index}`,
          word,
        }));
        setWords(shuffleArray(wordsWithIds));
      } catch (err) {
        setError("Failed to process headlines");
      }
    }
  }, [articles]);

  // Shuffle the array of words
  const shuffleArray = (array) => {
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
  };

  // Sort the array of words
  const sortWords = (array, descending = false) => {
    return array.sort((a, b) => {
      return descending
        ? b.word.localeCompare(a.word)
        : a.word.localeCompare(b.word);
    });
  };

  // Toggle between sorted and shuffled words
  const toggleSort = () => {
    setSorted(!sorted);
    setWords(sortWords([...words], sorted));
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col gap-2 p-4">
      <div className="flex items-center justify-between font-bold">
        <span>Headline Options</span>
        <button
          onClick={toggleSort}
          className="px-3 py-1 transition duration-300 bg-gray-200 rounded hover:bg-gray-300"
        >
          Sort {sorted ? "A-Z" : "Z-A"}
        </button>
      </div>
      <div className="flex flex-wrap gap-2 text-xs">
        {words.map(({ id, word }) => (
          <motion.div
            drag
            key={id}
            className="p-2 bg-blue-200 rounded shadow hover:cursor-pointer"
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            whileDrag={{ scale: 1.1 }}
            onDragEnd={(event, info) => {
              // This is where you could add the logic to handle the end of a drag
              // For now, it will just log the position where the word was dropped
              console.log(info.point.x, info.point.y);
            }}
          >
            {word}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
