import React, { useState } from "react";
import axios from "axios";
import DocumentForm from "./Components/DocumentForm";
import SearchBox from "./Components/SearchBox";
import SearchResult from "./Components/SearchResult";
import "./App.css";

const api = axios.create({
  baseURL: "http://localhost:8000",
});

function App() {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await api.get(`/api/search?query=${query}`);
      setSearchResults(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddDocument = async (document) => {
    try {
      await api.post("/api/documents", document);
      console.log("Document added successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <h1>Search App</h1>
      <SearchBox
        setQuery={setQuery}
        query={query}
        handleSearch={handleSearch}
      />
      <h3>Search Results:</h3>
      <ul>
        {searchResults.map((document, index) => (
           <SearchResult key={index} document={document} query={query} />
        ))}
      </ul>
      <DocumentForm onAddDocument={handleAddDocument} />
    </div>
  );
}

export default App;
