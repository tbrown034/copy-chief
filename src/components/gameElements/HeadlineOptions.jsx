import React, { useState, useMemo } from "react";
import { useDrag } from "react-dnd";

const DraggableWord = ({ word }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "word",
    item: { word },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`p-2 bg-blue-200 rounded shadow hover:cursor-pointer ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      {word}
    </div>
  );
};

export default function HeadlineOptions({ articles }) {
  const [sortOrder, setSortOrder] = useState("none"); // none, asc, desc

  // Use useMemo to optimize performance and prevent unnecessary sorting on re-renders
  const sortedWords = useMemo(() => {
    let allWords = articles.flatMap((article) => article.title.split(/\s+/));
    let uniqueWords = [...new Set(allWords)]; // Remove duplicates
    if (sortOrder === "asc") {
      uniqueWords.sort((a, b) => a.localeCompare(b));
    } else if (sortOrder === "desc") {
      uniqueWords.sort((a, b) => b.localeCompare(a));
    }
    return uniqueWords;
  }, [articles, sortOrder]); // Depend on articles and sortOrder

  // Handler to toggle sorting order
  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  return (
    <div className="p-2">
      <div className="flex items-center justify-between mb-4">
        <div className="text-2xl font-bold">Headline Options</div>
        <button
          onClick={toggleSortOrder}
          className="px-4 py-2 transition-colors duration-300 bg-gray-200 rounded hover:bg-gray-300"
        >
          Sort {sortOrder === "asc" ? "Z-A" : "A-Z"}
        </button>
      </div>
      <div className="flex flex-wrap gap-2 my-2">
        {sortedWords.map((word, index) => (
          <DraggableWord key={index} word={word} />
        ))}
      </div>
    </div>
  );
}
