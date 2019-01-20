import React, { Component } from 'react';
import './App.scss';

import { books } from './data/booksData';

import { Timeline } from './pages/timeline';
import { Header } from './ui/components';

class App extends Component {
    _createTimeline() {
        return books.reduce((gradesMap, book) => {
            if (gradesMap.has(book.grade)) {
                return gradesMap.set(book.grade, [
                    ...gradesMap.get(book.grade),
                    book
                ]);
            }

            return gradesMap.set(book.grade, [book]);
        }, new Map());
    }

    render() {

        return (
            <div className="App">
                <Header />
                <main>
                    <Timeline timeline={this._createTimeline()}/>
                </main>
            </div>
        );
    }
}

export default App;
