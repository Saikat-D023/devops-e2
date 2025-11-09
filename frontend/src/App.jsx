import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [health, setHealth] = useState(null);
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [healthRes, dataRes] = await Promise.all([
          axios.get(`${API_URL}/api/health`),
          axios.get(`${API_URL}/api/data`)
        ]);
        setHealth(healthRes.data);
        setData(dataRes.data);
      } catch (err) {
        console.error(err);
        setError('⚠️ Could not fetch backend data');
      }
    };
    fetchData();
  }, [API_URL]);

  return (
    <div className="App">
      <h1>🚀 MERN K8s Application</h1>

      {error && <p className="error">{error}</p>}

      <div className="card">
        <h2>Backend Health</h2>
        {health ? (
          <p>
            ✅ <strong>Status:</strong> {health.status} <br />
            🕒 <strong>Time:</strong>{' '}
            {new Date(health.timestamp).toLocaleString()}
          </p>
        ) : (
          <p>Loading health...</p>
        )}
      </div>

      <div className="card">
        <h2>Backend Data</h2>
        {data ? (
          <p>
            📦 <strong>Message:</strong> {data.message}
          </p>
        ) : (
          <p>Loading data...</p>
        )}
      </div>
    </div>
  );
}

export default App;
