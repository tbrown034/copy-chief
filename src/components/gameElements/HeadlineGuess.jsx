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
  let backgroundColor = "#fff";
  if (isActive) {
    backgroundColor = "darkgreen";
  }

  return (
    <div
      ref={drop}
      style={{
        backgroundColor,
        width: "100px",
        height: "20px",
        border: "1px solid black",
      }}
    >
      {/* Placeholder for dropped word */}
    </div>
  );
};

export default function HeadlineGuess({ articles }) {
  // State to track the words dropped into the headline containers
  const [droppedWords, setDroppedWords] = useState({});

  const handleDropWord = (word, index, wordIndex) => {
    console.log(
      `Dropped ${word} into headline #${index + 1} at position ${wordIndex}`
    );
    setDroppedWords((prevState) => ({
      ...prevState,
      [index]: {
        ...prevState[index],
        [wordIndex]: word,
      },
    }));
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
      <button onClick={() => setDroppedWords({})}>Clear All</button>
    </div>
  );
}
