import React, { useState } from "react";

function App() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);

    const search = async () => {
        setLoading(true);

        const response = await fetch(
            "https://ta3epx1768.execute-api.eu-west-2.amazonaws.com/prod/",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ query })
            }
        );

        const data = await response.json();
        setResults(data);
        setLoading(false);
    };

    return (
        <div style={{ padding: 40 }}>
            <h1>Property Finder AI</h1>

            <textarea
                rows="4"
                style={{ width: "100%" }}
                placeholder="Describe your perfect property..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />

            <button onClick={search} disabled={loading}>
                {loading ? "Searching..." : "Search"}
            </button>

            {results && (
                <pre style={{ marginTop: 20 }}>
                    {JSON.stringify(results, null, 2)}
                </pre>
            )}
        </div>
    );
}

export default App;
