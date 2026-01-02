import React, { useState } from "react";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const search = async () => {
    setLoading(true);
    setError("");
    setResults(null);

    try {
      const response = await fetch(
        "https://ta3epx1768.execute-api.eu-west-2.amazonaws.com/prod/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query })
        }
      );

      if (!response.ok) {
        throw new Error(`API returned ${response.status}`);
      }

      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError("Something went wrong while searching. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Property Finder AI</h1>

      <textarea
        className="input"
        rows="4"
        placeholder="Describe your ideal property..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <button className="button" onClick={search} disabled={loading}>
        {loading ? "Searching..." : "Search"}
      </button>

      {loading && (
        <div className="spinner-container">
          <div className="spinner"></div>
          <p>Finding the best matches...</p>
        </div>
      )}

      {error && <div className="error">{error}</div>}

      {results && (
        <div className="results">
          <h2>Top Matches</h2>
          <pre>{JSON.stringify(results, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
