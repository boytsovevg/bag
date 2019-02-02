import React, { Component } from 'react';
import './App.scss';

import { books } from './data/books.data';
import { booksStatusesData } from './data/booksStatuses.data';

import { Timeline } from './pages/timeline';
import { Header } from './ui/components';
import { Grade, BookStatus } from './enums';
import { BookContract, BookStatusInfoContract } from './contracts';

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

    private getBookStatusesMap(): Map<number, BookStatusInfoContract> {
        return booksStatusesData.reduce((statusMap, statusInfo) => {

            return statusInfo.status === BookStatus.inProgress &&
            statusMap.set(statusInfo.bookId, statusInfo) || statusMap
        }, new Map<number, BookStatusInfoContract>());
    }

    public render() {

        return (
            <div className="App">
                <Header />
                <main>
                    <Timeline 
                        bookStatuses={this.getBookStatusesMap()}
                        timeline={this.createTimeline()}
                    />
                </main>
            </div>
        );
    }
}
