import React, { Component } from 'react';
import './App.scss';

import axios from 'axios';

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
        timeline: new Map(),
        bookStatuses: new Map()
    };

    async componentDidMount(): Promise<void> {
        const timeline = await this.createTimeline();
        const bookStatuses = this.getBookStatusesMap(booksStatusesData);

        this.setState({ timeline, bookStatuses })
    }

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

    private async getBooks(): Promise<BookContract[]> {
        const booksResponse = await axios.get('api/books');

        return booksResponse.data;
    }

    private async createTimeline(): Promise<Map<Grade, BookContract[]>> {

        const books = await this.getBooks();

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
