import React from 'react';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import './App.scss';
import NotFoundPage from './components/pages/notFoundPage';
import MainController from './components/pages/Main/Main.controller';

function App() {
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route exact path="/" component={MainController}  />
          <Route component={NotFoundPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
