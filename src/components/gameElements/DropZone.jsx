import React from "react";
import { useDrop } from "react-dnd";

export default function DropZone({ onDropWord, index, wordIndex, placedWord }) {
  const [{ isOver }, drop] = useDrop({
    accept: "word",
    drop: (item) => onDropWord(item.word, index, wordIndex),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  // Tailwind CSS classes for base, hover effect, and placed word
  const baseClasses =
    "h-12 p-2 text-lg font-bold border-2 border-blue-800 rounded-lg min-w-[3rem]";
  const hoverClasses = isOver ? "bg-gray-200" : "";
  const placedWordClasses = placedWord ? "bg-sky-800 text-white" : "bg-white";

  return (
    <div
      ref={drop}
      className={`${baseClasses} ${placedWordClasses} ${hoverClasses}`}
    >
      {placedWord}
    </div>
  );
}

// Headl
