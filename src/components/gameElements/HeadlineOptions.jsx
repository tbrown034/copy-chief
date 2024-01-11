import React from "react";
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
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      {word}
    </div>
  );
};

export default function HeadlineOptions({ articles }) {
  const words = articles.flatMap((article) => article.title.split(" "));

  return (
    <div className="flex flex-wrap">
      {words.map((word, index) => (
        <DraggableWord key={index} word={word} />
      ))}
    </div>
  );
}
