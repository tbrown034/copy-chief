import React, { useState } from "react";
import { motion } from "framer-motion";

export default function HeadlineGuess({ articles }) {
  // State to track the words dropped into the headline containers
  // It's an object where the keys are the headline indexes and the values are arrays of words
  const [droppedWords, setDroppedWords] = useState({});

  // Function to handle the end of a drag event
  const handleDragEnd = (index, word) => {
    // Logic to determine if the word is dropped within a target container
    // For now, we'll just log it to the console
    console.log(`Dropped word: ${word} into headline #${index + 1}`);

    // Update the dropped words state with the new word
    setDroppedWords((prevState) => {
      const newDroppedWords = { ...prevState };
      if (!newDroppedWords[index]) {
        newDroppedWords[index] = [];
      }
      newDroppedWords[index].push(word);
      return newDroppedWords;
    });
  };

  // Calculate the width of the longest word to define the drop container size
  const calculateContainerWidth = () => {
    const longestWordLength = articles
      .flatMap((article) => article.title.split(/\s+/))
      .reduce(
        (longest, current) =>
          longest.length >= current.length ? longest : current,
        ""
      ).length;
    return `${longestWordLength * 12 + 10}px`;
  };

  // A helper function to clear all dropped words - could be triggered by a reset button
  const clearDroppedWords = () => {
    setDroppedWords({});
  };

  return (
    <div className="space-y-6">
      {articles.map((article, index) => (
        <div key={`headline-${index}`} className="flex flex-col">
          <div className="flex items-center mb-2">
            <strong>Headline #{index + 1}:</strong>
            <span className="ml-2 text-sm text-gray-600">{`${
              article.title.split(" ").length
            } words`}</span>
          </div>
          <div className="flex items-center gap-2">
            {article.title.split(" ").map((_, idx) => (
              <motion.div
                key={`word-container-${index}-${idx}`}
                className="border-2 border-gray-300 rounded"
                style={{ width: calculateContainerWidth(), height: "50px" }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                // Placeholder for drag logic
                onDragEnd={() => handleDragEnd(index, _)}
                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                dragElastic={0.5}
              >
                {/* Placeholder for dropped word */}
                {droppedWords[index] && droppedWords[index][idx]}
              </motion.div>
            ))}
          </div>
        </div>
      ))}
      {/* Button to clear all dropped words */}
      <button onClick={clearDroppedWords}>Clear All</button>
    </div>
  );
}
