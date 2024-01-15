import React from "react";
import { useDrag, useDrop } from "react-dnd";

export default function DropZone({
  onDropWord,
  onRemoveWord,
  index,
  wordIndex,
  placedWord,
}) {
  // Dropping logic
  const [{ isOver }, drop] = useDrop({
    accept: "word",
    drop: (item) => onDropWord(item.word, index, wordIndex),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  // Dragging after dropping logic
  const [{ isDragging }, drag] = useDrag({
    type: "word",
    item: { type: "word", index, wordIndex, word: placedWord },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      // If the item is not dropped in a new target, re-add it to the options
      if (!monitor.didDrop()) {
        onRemoveWord(item.word);
      }
    },
  });

  // Tailwind CSS classes for base, hover effect, and placed word
  const baseClasses =
    "h-12 p-2 text-lg font-bold border-2 border-blue-800 rounded-lg min-w-[3rem]";
  const hoverClasses = isOver ? "bg-gray-200" : ""; // Changed to isOver for drop hover effect
  const placedWordClasses = placedWord ? "bg-sky-800 text-white" : "bg-white";
  const pointer = placedWord ? "hover:cursor-pointer" : "";

  const dropZoneRef = (el) => {
    drag(el);
    drop(el);
  };

  return (
    <div
      ref={dropZoneRef}
      className={`${pointer} ${baseClasses} ${placedWordClasses} ${hoverClasses}`}
    >
      {placedWord}
    </div>
  );
}
