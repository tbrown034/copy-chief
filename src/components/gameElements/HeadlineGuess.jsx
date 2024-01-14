import React, { useState } from "react";
import { useDrop } from "react-dnd";

// DropZone component represents each slot for dropping words
const DropZone = ({ onDropWord, index, wordIndex, placedWord }) => {
  const [{ isOver }, drop] = useDrop({
    accept: "word",
    drop: (item) => onDropWord(item.word, index, wordIndex),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  // Define Tailwind classes for each state
  const baseClasses =
    "h-12 p-2 text-lg font-bold border-2 border-blue-800 rounded-lg min-w-12";
  const placedWordClasses = placedWord ? "bg-sky-800 text-sky-100" : "bg-white"; // Replace 'bg-lightblue-500' with your actual Tailwind class
  const hoverClasses = isOver ? "bg-lightblue-500" : ""; // Replace 'bg-lightblue-500' with your actual Tailwind class

  return (
    <div
      ref={drop}
      className={`${baseClasses} ${placedWordClasses} ${hoverClasses}`}
    >
      {placedWord}
    </div>
  );
};

// HeadlineGuess component where all DropZones for a headline are rendered
export default function HeadlineGuess({ articles, onWordRemoved }) {
  const [droppedWords, setDroppedWords] = useState({});

  // Function called when a word is dropped into a DropZone
  const handleDropWord = (word, index, wordIndex) => {
    setDroppedWords((prev) => ({
      ...prev,
      [index]: {
        ...(prev[index] || {}),
        [wordIndex]: word,
      },
    }));
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
