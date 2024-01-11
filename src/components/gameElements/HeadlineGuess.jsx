import React, { useState } from "react";
import { useDrop } from "react-dnd";

const DropZone = ({ onDropWord, index, wordIndex }) => {
  const [{ isOver }, drop] = useDrop({
    accept: "word",
    drop: (item) => onDropWord(item.word, index, wordIndex),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const isActive = isOver;
  let backgroundColor = isActive ? "darkgreen" : "#fff";

  // Set a fixed width and height for the drop zones
  const style = {
    width: "60px", // You may adjust the width as needed
    height: "30px", // You may adjust the height as needed
    backgroundColor,
    display: "flex",
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
    color: isActive ? "#fff" : "#000",
    border: "1px solid #ddd",
    borderRadius: "4px",
  };

  return (
    <div ref={drop} style={style}>
      {/* Placeholder for dropped word */}
    </div>
  );
};

export default function HeadlineGuess({ articles }) {
  const [droppedWords, setDroppedWords] = useState({});

  const handleDropWord = (word, index, wordIndex) => {
    console.log(
      `Dropped ${word} into headline #${index + 1} at position ${wordIndex}`
    );
    // Update the dropped words state with the new word
    setDroppedWords((prevState) => {
      const newDroppedWords = { ...prevState };
      if (!newDroppedWords[index]) {
        newDroppedWords[index] = [];
      }
      newDroppedWords[index][wordIndex] = word;
      return newDroppedWords;
    });
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
          <div className="flex flex-wrap items-center gap-2">
            {article.title.split(" ").map((_, wordIndex) => (
              <DropZone
                key={`word-container-${index}-${wordIndex}`}
                onDropWord={handleDropWord}
                index={index}
                wordIndex={wordIndex}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
