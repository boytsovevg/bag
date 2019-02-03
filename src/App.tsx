import React, { Component } from 'react';
import './App.scss';

import { books } from './data/books.data';
import { booksStatusesData } from './data/booksStatuses.data';

import { Grade, BookStatus } from './enums';
import { BookContract, BookProgressInfoContract } from './contracts';

import { Timeline } from './pages/timeline';
import { Header } from './ui/components';


interface Props {
}

interface State {
    timeline: Map<Grade, BookContract[]>;
    bookStatuses: Map<number, BookProgressInfoContract>;
}

export class App extends Component<Props, State> {
    state = {
        timeline: this.createTimeline(),
        bookStatuses: this.getBookStatusesMap(booksStatusesData)
    };

    updateBookProgress = (id: number, progress: BookProgressInfoContract): void => {


        this.setState((previousState: State) => {
            const stateBooksStatuses = Array.from(previousState.bookStatuses.values());

            const bookStatus = stateBooksStatuses.find(status => status.bookId === id);
            const bookStatuses = stateBooksStatuses.filter(status => status.bookId !== id);

            return ({
                bookStatuses: this.getBookStatusesMap([
                    ...bookStatuses,
                    {
                        ...bookStatus,
                        ...progress
                    }
                ])
            })
        })
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

    private getBookStatusesMap(booksStatusesData: BookProgressInfoContract[]): Map<number, BookProgressInfoContract> {
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
                        updateBookProgress={this.updateBookProgress}
                    />
                </main>
            </div>
        );
    }
}
