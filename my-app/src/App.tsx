import React from 'react';
import './App.css';
import { download } from "./api";


function App() {


  const handleClick = (id: number) => {
    download(id)
  }

  return (
    <div className="App">
      {[1, 2, 3].map(i => 
      <div onClick={() => handleClick(i)} key={i}>
        Download file {i}
      </div>
      )}
    </div>
  );
}

export default App;
