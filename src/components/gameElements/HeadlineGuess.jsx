import React from "react";
import { motion } from "framer-motion";

export default function HeadlineGuess({ articles }) {
  return (
    <div className="flex flex-col ">
      {articles.slice(0, 5).map((article, index) => (
        <motion.div
          key={index}
          className="flex gap-2 p-4 my-2 border-2 border-gray-300 rounded"
          onDragOver={(e) => e.preventDefault()} // Necessary for onDrop to work
        >
          {/* You can dynamically create placeholders based on the headline */}
          {article.title.split(" ").map((_, wordIndex) => (
            <div
              key={wordIndex}
              className="p-2 border-2 border-gray-300 rounded"
            >
              {/* Placeholder for a word */}
            </div>
          ))}
        </motion.div>
      ))}
    </div>
  );
}
