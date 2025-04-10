import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [emojis, setEmojis] = useState([]);
  const [filteredEmojis, setFilteredEmojis] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch all emojis on mount
  useEffect(() => {
    axios.get('https://emojihub.yurace.pro/api/all')
      .then((res) => {
        setEmojis(res.data);
        setFilteredEmojis(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch emojis", err);
        setLoading(false);
      });
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = emojis.filter(emoji =>
      emoji.name.toLowerCase().includes(value) ||
      emoji.category.toLowerCase().includes(value)
    );

    setFilteredEmojis(filtered);
  };

  return (
    <div className="app">
      <h1>🔍 Emoji Search (API)</h1>
      <input
        type="text"
        placeholder="Type to search..."
        value={searchTerm}
        onChange={handleSearch}
      />

      {loading ? (
        <p>Loading emojis...</p>
      ) : (
        <div className="emoji-grid">
          {filteredEmojis.slice(0, 50).map((emoji, index) => (
            <div className="emoji-card" key={index}>
              <span dangerouslySetInnerHTML={{ __html: emoji.htmlCode[0] }} />
              <p>{emoji.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
