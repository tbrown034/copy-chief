import React, { useState } from "react";
import DropZone from "./DropZone";

// HeadlineGuess component where all DropZones for a headline are rendered
export default function HeadlineGuess({ articles, onWordRemoved }) {
  const [droppedWords, setDroppedWords] = useState({});

  // Function called when a word is dropped into a DropZone
  const handleDropWord = (word, index, wordIndex) => {
    setDroppedWords((prev) => {
      const newState = { ...prev };
      // Remove the word from its previous position
      Object.keys(newState).forEach((key) => {
        Object.keys(newState[key]).forEach((wordKey) => {
          if (newState[key][wordKey] === word) {
            delete newState[key][wordKey];
          }
        });
      });
      // Add the word to the new position
      newState[index] = newState[index] || {};
      newState[index][wordIndex] = word;
      return newState;
    });
  };

  // Function to clear all placed words
  const clearAllWords = () => {
    setDroppedWords({});
    onWordRemoved(null); // null indicates clearing all words
  };

  // Render headlines and DropZones
  return (
    <div className="flex flex-col gap-2">
      <div className="text-2xl font-bold">Headline Guesses</div>
      {articles.map((article, index) => (
        <div key={`headline-${index}`} className="flex flex-col">
          <div className="flex items-center">
            <strong>Headline #{index + 1}:</strong>
            <span className="ml-2 text-sm ">
              ({`${article.title.split(" ").length} words)`}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {article.title.split(" ").map((_, wordIndex) => (
              <DropZone
                key={`dropzone-${index}-${wordIndex}`}
                onDropWord={handleDropWord}
                index={index}
                wordIndex={wordIndex}
                placedWord={droppedWords[index]?.[wordIndex]}
              />
            ))}
          </div>
        </div>
      ))}
      <div>
        <button
          className="p-2 px-4 text-lg bg-sky-600 hover:bg-sky-700 active:bg-sky-600 text-sky-100 rounded-xl"
          onClick={clearAllWords}
        >
          Clear All
        </button>
      </div>
    </div>
  );
}
