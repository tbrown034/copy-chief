import { useDrag } from "react-dnd";

export default function DraggableWord({
  word,
  isUsed,
  onDragged,
  removeWordFromOptions,
}) {
  const [{ isDragging }, drag] = useDrag({
    type: "word",
    item: { word },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      if (monitor.didDrop()) {
        onDragged(); // Call the callback when the word is dropped
        removeWordFromOptions(item.word);
      }
    },
  });

  return (
    <div
      ref={drag}
      className={`p-2 bg-blue-200 rounded shadow ${
        isUsed ? "bg-gray-300 text-gray-500" : "hover:cursor-pointer"
      } ${isDragging ? "opacity-50" : "opacity-100"}`}
    >
      {word}
    </div>
  );
}
