import React from "react";

export default function HeadlineAnswers({ articles }) {
  return (
    <div>
      {articles.map((article, index) => (
        <div key={index}>
          <strong>Headline #{index + 1}</strong>: {article.title}{" "}
          {/* other content */}
        </div>
      ))}
    </div>
  );
}
