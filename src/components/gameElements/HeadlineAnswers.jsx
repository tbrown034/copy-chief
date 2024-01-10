import React from "react";

export default function HeadlineAnswers({ articles }) {
  return (
    <div>
      {articles.map((article, index) => (
        <div key={index}>
          <div className="headline">
            <strong>Headline:</strong> {article.title}{" "}
            {/* Use article.title instead of article.headline */}
          </div>
          <div className="summary">
            <strong>Summary:</strong> {article.abstract}{" "}
            {/* Use article.abstract instead of article.summary */}
          </div>
          <a href={article.url} target="_blank" rel="noopener noreferrer">
            {" "}
            {/* Use article.url instead of article.link */}
            Read more
          </a>
        </div>
      ))}
    </div>
  );
}
