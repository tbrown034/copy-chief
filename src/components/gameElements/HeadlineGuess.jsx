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

  // Change the background color when word is placed or hovered
  let backgroundColor = placedWord ? "lightblue" : "#fff";
  if (isOver) {
    backgroundColor = "lightblue";
  }

  return (
    <div
      className="h-12 p-2 text-lg border-2 border-blue-800 rounded-lg min-w-12"
      ref={drop}
      style={{ backgroundColor }}
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
    <div className="space-y-6">
      <div className="mb-2 text-2xl font-bold">Headline Guesses</div>
      {articles.map((article, index) => (
        <div key={`headline-${index}`} className="flex flex-col">
          <div className="flex items-center">
            <strong>Headline #{index + 1}:</strong>
            <span className="ml-2 text-sm text-gray-600">
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
      <button onClick={clearAllWords}>Clear All</button>
    </div>
  );
}
