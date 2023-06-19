import React from "react";
import "../App.css";

const SearchResult = ({document, query }) => {

  const highlightSearchTerm = (content) => {
    const regex = new RegExp(`(${query})`, "gi");
    return content.replace(regex, '<span class="highlighted">$1</span>');
  };

  return (
    <li key={document._id} className="search-result">
      <div
        dangerouslySetInnerHTML={{
          __html: highlightSearchTerm(document.name),
        }}
        style={{ fontSize: "20px", fontWeight: "bold" }}
      />
      <div
        dangerouslySetInnerHTML={{
          __html: highlightSearchTerm(document.text),
        }}
        style={{ fontSize: "16px", marginTop: "10px" }}
      />
      
      <div
        dangerouslySetInnerHTML={{
          __html: `Author: ${highlightSearchTerm(document.author)}, Date: ${new Date(document.date).toISOString().slice(0, 10)}`,
        }}
        style={{ fontSize: "14px", marginTop: '10px' }}
      />
    </li>
  );
};

export default SearchResult;
