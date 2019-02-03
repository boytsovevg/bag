import React, { Component } from 'react';
import './App.scss';

import { books } from './data/books.data';
import { booksStatusesData } from './data/booksStatuses.data';

import { Timeline } from './pages/timeline';
import { Header } from './ui/components';
import { Grade, BookStatus } from './enums';
import { BookContract, BookProgressInfoContract } from './contracts';


interface Props {

}

interface State {
    timeline: Map<Grade, BookContract[]>;
    bookStatuses: Map<number, BookProgressInfoContract>;
}

export class App extends Component<Props, State> {
    state = {
        timeline: this.createTimeline(),
        bookStatuses: this.getBookStatusesMap()
    };

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

    private getBookStatusesMap(): Map<number, BookProgressInfoContract> {
        return booksStatusesData.reduce((statusMap, statusInfo) => {

            return statusInfo.status !== BookStatus.complete &&
            statusMap.set(statusInfo.bookId, statusInfo) || statusMap
        }, new Map<number, BookProgressInfoContract>());
    }

    public render() {

        return (
            <div className="App">
                <Header />
                <main>
                    <Timeline 
                        bookStatuses={this.state.bookStatuses}
                        timeline={this.state.timeline}
                    />
                </main>
            </div>
        );
    }
}
