import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function HeadlineOptions({ articles, onDragEnd }) {
  const [words, setWords] = useState([]);
  const [sortOrder, setSortOrder] = useState(""); // Tracks the sort order: "", "asc", or "desc"
  const [error, setError] = useState(null);

  useEffect(() => {
    if (articles && articles.length > 0) {
      // Extract and shuffle words when articles are first loaded or changed
      const extractedWords = extractWords(articles);
      setWords(shuffleArray(extractedWords));
    }
  }, [articles]);

  // Extract words from article titles and assign unique IDs
  const extractWords = (articles) => {
    return articles
      .flatMap((article) => article.title.split(/\W+/).filter(Boolean))
      .map((word) => ({
        word,
        id: `${word}-${Math.random().toString(36).substr(2, 9)}`,
      }));
  };

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
  const sortArray = (array, order) => {
    return [...array].sort((a, b) => {
      return order === "asc"
        ? a.word.localeCompare(b.word)
        : b.word.localeCompare(a.word);
    });
  };

  // Handler to toggle sorting
  const toggleSortOrder = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newOrder);
    setWords(sortArray(words, newOrder));
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col gap-2 p-4">
      <div className="flex items-center justify-between font-bold">
        <span>Headline Options</span>
        <button
          onClick={toggleSortOrder}
          className="px-3 py-1 transition duration-300 bg-gray-200 rounded hover:bg-gray-300"
        >
          Sort {sortOrder === "asc" ? "Z-A" : "A-Z"}
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {words.map(({ id, word }) => (
          <motion.div
            drag
            key={id}
            className="p-2 bg-blue-200 rounded shadow hover:cursor-pointer"
            onDragEnd={() => onDragEnd(id)}
          >
            {word}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
