import React, { useState } from "react";

const DocumentForm = ({ onAddDocument }) => {
  const [author, setAuthor] = useState("");
  const [name, setName] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const document = {
      name,
      author,
      date: new Date(),
      text,
    };
    onAddDocument(document);
    // Reset the form fields
    setAuthor("");
    setText("");
    setName("");
  };

  return (
    <form className="main-form-container" onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        Author:
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </label>
      <label>
        Text:
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </label>
      <button type="submit">Add Document</button>
    </form>
  );
};

export default DocumentForm;
