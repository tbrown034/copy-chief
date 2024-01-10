import { useState, useEffect } from "react";
import dummyHeadlines from "../../assets/Headliens/dummy_headlines.json";

export default function HeadlineOptions() {
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      // Simulating fetching the last 5 articles (assuming dummyHeadlines is an object with a headlines array)
      const lastFiveArticles = dummyHeadlines.headlines.slice(-5);

      // Process headlines to extract words
      const allWords = lastFiveArticles.flatMap((article) =>
        article.headline.split(/\W+/).filter(Boolean)
      );

      // Shuffle words using a simple shuffle algorithm
      const shuffledWords = shuffleArray([...new Set(allWords)]); // Remove duplicates with Set and shuffle

      // Assign unique IDs based on index
      const wordsWithIds = shuffledWords.map((word, index) => ({
        id: `word-${index}`,
        word,
      }));

      setWords(wordsWithIds);
    } catch (err) {
      setError("Failed to process headlines");
    }
    setLoading(false);
  }, []);

  // Shuffle function
  function shuffleArray(array) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  if (loading) return <div>Loading headlines...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex flex-col gap-2 p-4">
      <div className="font-bold">Headline Options</div>
      <div className="flex flex-wrap gap-2">
        {words.map(({ id, word }) => (
          <div key={id} className="p-2 bg-blue-200 rounded shadow">
            {word}
          </div>
        ))}
      </div>
    </div>
  );
}
