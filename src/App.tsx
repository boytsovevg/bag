import React, { Component } from 'react';
import './App.scss';

import { books } from './data/booksData';

import { Timeline } from './pages/timeline';
import { Header } from './ui/components';
import { Grade } from './enums';
import { BookContract } from './contracts';

export class App extends Component {
    private createTimeline(): Map<Grade, BookContract[]> {

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

    public render() {

        return (
            <div className="App">
                <Header />
                <main>
                    <Timeline timeline={this.createTimeline()}/>
                </main>
            </div>
        );
    }
}
