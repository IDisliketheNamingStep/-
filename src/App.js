import React from 'react';
import './App.css';
import {Route, Switch, Redirect} from 'react-router-dom'
import HomePage from "./pages/homePage/homePage";
import SelectMovie from "./pages/selectMovie/selectMovie";
import CategoryShow from "./pages/categoryShow/categoryShow";



function App() {
  return (
    <div className="App">
        <Switch>
            <Route path='/home'><HomePage /></Route>
            <Route path='/selectMovie/:curContentType' render={()=><SelectMovie key='movie' />} />
            <Route path='/selectTV/:curContentType' render={()=><SelectMovie key='tv' />} />
            <Route path='/categoryShow'><CategoryShow /></Route>
            <Redirect from='/' to='/home'/>
        </Switch>
    </div>
  );
}

export default App;
