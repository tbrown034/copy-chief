import React, { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import HeadlineAnswers from "../gameElements/HeadlineAnswers"; // Adjust the import path as needed
import HeadlineGuess from "../gameElements/HeadlineGuess"; // Adjust the import path as needed
import HeadlineOptions from "../gameElements/HeadlineOptions"; // Adjust the import path as needed
import Header from "./Header"; // Adjust the import path as needed

export default function GameMenu({ backToMenu }) {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [headlineCorrectness, setHeadlineCorrectness] = useState({});
  const [usedWords, setUsedWords] = useState([]);

  const API_KEY = import.meta.env.VITE_NYT_API_KEY;
  const numOfArticles = 2;

  const clearAllUsedWords = () => {
    setUsedWords([]);
  };

  const handleWordRemoved = (word) => {
    setUsedWords((prevWords) => prevWords.filter((w) => w !== word));
  };

  // Inside your component return function, pass it down to HeadlineGuess

  useEffect(() => {
    const fetchHeadlines = async () => {
      try {
        const response = await fetch(
          `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${API_KEY}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setArticles(data.results.slice(0, numOfArticles));
      } catch (error) {
        console.error("There was a problem with the fetch operation", error);
        setError("Failed to load headlines");
      }
    };
    fetchHeadlines();
  }, []);

  // Function to handle the check answer logic
  // You will need to implement this based on your game's rules
  const checkAnswer = (/* parameters */) => {
    // ... implementation
  };

  return error ? (
    <div>Error: {error}</div>
  ) : !articles.length ? (
    <div>Loading headlines...</div>
  ) : (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen ">
        <Header />
        <div className="flex flex-col gap-2">
          <HeadlineGuess
            articles={articles}
            onWordRemoved={handleWordRemoved}
            clearAllUsedWords={clearAllUsedWords}
          />

          <HeadlineOptions
            articles={articles}
            usedWords={usedWords}
            setUsedWords={setUsedWords}
          />
          <HeadlineAnswers articles={articles} />
          <div className="flex justify-center">
            <button
              onClick={backToMenu}
              className="p-2 px-12 text-lg bg-sky-900 hover:bg-sky-700 active:bg-sky-600 text-sky-100 rounded-xl"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </DndProvider>
  );
}
