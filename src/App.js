import React, { Component } from 'react';
import './App.scss';

import { Timeline } from './pages/timeline';

class App extends Component {
  render() {
    return (
        <div className="App">
            <header className="header flex flex_justify_spaced">
                <h1>Books and Grades</h1>
                <span className="years-ago">many years ago...</span>
            </header>
            <main>
                <Timeline/>
            </main>
        </div>
    );
  }
}

export default App;
