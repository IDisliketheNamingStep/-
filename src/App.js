import React from 'react';
import './App.css';
import HomePage from "./pages/homePage/homePage";
import SelectMovie from "./pages/selectMovie/selectMovie";
import CategoryShow from "./pages/categoryShow/categoryShow";



function App() {
  return (
    <div className="App">
      {/*<HomePage />*/}
      {/*  <SelectMovie />*/}
        <CategoryShow />
    </div>
  );
}

export default App;
