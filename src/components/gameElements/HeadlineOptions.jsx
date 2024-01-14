import React, { useState, useMemo } from "react";
import DraggableWord from "./DraggableWord.jsx";
export default function HeadlineOptions({ articles }) {
  const [sortOrder, setSortOrder] = useState("asc");

  const words = useMemo(() => {
    const allWords = articles.flatMap((article) => article.title.split(/\s+/));
    const uniqueWords = [...new Set(allWords)];
    if (sortOrder === "asc") {
      return uniqueWords.sort((a, b) => a.localeCompare(b));
    } else {
      return uniqueWords.sort((a, b) => b.localeCompare(a));
    }
  }, [articles, sortOrder]);

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const removeWordFromOptions = (word) => {
    setWords((currentWords) => currentWords.filter((w) => w !== word));
  };

  const addWordToOptions = (word) => {
    setWords((currentWords) => [...currentWords, word]);
  };

  return (
    <div className="flex flex-col items-start gap-2 ">
      <div className="mb-2 text-2xl font-bold">Headline Options</div>
      <button
        onClick={toggleSortOrder}
        className="p-2 px-4 text-lg bg-sky-600 hover:bg-sky-700 active:bg-sky-600 text-sky-100 rounded-xl"
      >
        {sortOrder === "asc" ? (
          <div className="flex items-center justify-center gap-2">
            <span>A-Z</span>
            <i className="fa-solid fa-down"></i>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2">
            <span>Z-A</span>
            <i className="fa-solid fa-up"></i>
          </div>
        )}
      </button>
      <div className="flex flex-wrap gap-2">
        {words.map((word, index) => (
          <DraggableWord
            key={index}
            word={word}
            removeWordFromOptions={removeWordFromOptions}
          />
        ))}
      </div>
    </div>
  );
}
