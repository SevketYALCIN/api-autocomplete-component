import React from 'react';
import './App.css';
import AutocompleteInput from './components/AutocompleteInput/AutocompleteInput';

function App() {
  return (
    <div className="app">
      <div className="header">
        <h1>Autocomplete</h1>
      </div>
      <div className="content">
        <AutocompleteInput />
      </div>
    </div>
  );
}

export default App;
