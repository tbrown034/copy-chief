import React from "react";

export default function HeadlineAnswers({ articles }) {
  return (
    <div>
      <div className="mb-2 text-2xl font-bold">
        Headline Anwers (Delete later)
      </div>

      {articles.map((article, index) => (
        <div key={index}>
          <strong>Headline #{index + 1}</strong>: {article.title}{" "}
          {/* other content */}
        </div>
      ))}
    </div>
  );
}
