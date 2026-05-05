"use client";
import { useState } from 'react';

export default function QueryPage() {
  const [sql, setSql] = useState("SELECT title, author FROM biblio LIMIT 10;");
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  const runQuery = async () => {
    setError(null);
    const res = await fetch('/api/query', {
      method: 'POST',
      body: JSON.stringify({ sql }),
    });
    const data = await res.json();
    if (data.error) setError(data.error);
    else setResults(data);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Library Data Explorer</h1>
      <textarea 
        value={sql} 
        onChange={(e) => setSql(e.target.value)} 
        style={{ width: '100%', height: '150px', marginBottom: '10px' }}
      />
      <button onClick={runQuery} style={{ padding: '10px 20px', cursor: 'pointer' }}>Run Report</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <table border="1" style={{ marginTop: '20px', width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {results.length > 0 && Object.keys(results[0]).map(key => <th key={key}>{key}</th>)}
          </tr>
        </thead>
        <tbody>
          {results.map((row, i) => (
            <tr key={i}>
              {Object.values(row).map((val, j) => <td key={j}>{val}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
