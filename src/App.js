import React, { Component } from 'react';
import './App.scss';

import { Timeline } from './pages/timeline';
import { Header } from './ui/components';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Header />
                <main>
                    <Timeline/>
                </main>
            </div>
        );
    }
}

export default App;
