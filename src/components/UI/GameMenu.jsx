import { useState, useEffect } from "react";
import HeadlineAnswers from "../gameElements/HeadlineAnswers";
import HeadlineGuess from "../gameElements/HeadlineGuess";
import HeadlineOptions from "../gameElements/HeadlineOptions";
import Header from "./Header";

export default function GameMenu({ backToMenu }) {
  const [articles, setArticles] = useState([]);
  const [completedHeadlines, setCompletedHeadlines] = useState({});
  const [error, setError] = useState(null);

  const API_KEY = import.meta.env.VITE_NYT_API_KEY;
  const numOfArticles = 3;

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

  const checkAnswer = (articleIndex, userAnswer) => {
    const correctAnswer = headlines[articleIndex].headline
      .split(/\W+/)
      .filter(Boolean);
    const isCorrect =
      userAnswer.length === correctAnswer.length &&
      userAnswer.every((word, index) => word === correctAnswer[index]);
    setCompletedHeadlines({
      ...completedHeadlines,
      [articleIndex]: isCorrect,
    });
  };

  return error ? (
    <div>Error: {error}</div>
  ) : !articles.length ? (
    <div>Loading headlines...</div>
  ) : (
    <div className="">
      <Header />
      <div className="flex flex-col ">
        <HeadlineGuess articles={articles} />

        <HeadlineOptions articles={articles} />
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
  );
}
