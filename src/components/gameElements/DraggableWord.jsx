import { useDrag } from "react-dnd";

export default function DraggableWord({
  word,
  removeWordFromOptions,
  addWordToOptions,
}) {
  const [{ isDragging }, drag] = useDrag({
    type: "word",
    item: { word },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      if (!monitor.didDrop()) {
        addWordToOptions(item.word); // Add this line
      }
    },
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
}
