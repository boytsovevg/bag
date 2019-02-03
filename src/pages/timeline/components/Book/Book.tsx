import React, { KeyboardEvent, FocusEvent, Component } from 'react';
import './Book.scss';

import { BookContract, BookProgressInfoContract } from '../../../../contracts';
import { BookType } from '../../../../enums';

interface Props {
    book: BookContract;
    progressInfo?: BookProgressInfoContract;
    updateCurrentProgress: (value: number) => void;
}

interface State {
    mouseEntered: boolean;
}

export class Book extends Component<Props, State> {

    state = {
        mouseEntered: false
    };

    hoverBook = () => this.setState({ mouseEntered: true });

    leaveBook = () => this.setState({ mouseEntered: false });

    getProgressWidth(book: BookContract, progressInfo: BookProgressInfoContract): number {
        return 350 - 350 * progressInfo.currentProgress / Number(book.duration);
    };

    updateProgress = (value: string) => {
        const pageNumber = parseInt(value, 10);

        const progress = isNaN(pageNumber) ? 0 :
            pageNumber > this.props.book.duration ?
                this.props.book.duration :
                pageNumber;

        this.props.updateCurrentProgress(progress);
    };

    acceptProgress = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            this.updateProgress(event.currentTarget.value);
        }
    };

    public render() {
        const { book, progressInfo } = this.props;
        const { title, author, url, type, duration } = book;

        return (
            <div className="book"
                onMouseEnter={ this.hoverBook }
                onMouseLeave={ this.leaveBook }
            >
                <img className="book__image"
                     src={url}
                     alt={title}
                />

                <div className="book__info">
                    <div>{title}</div>
                    <div>{author}</div>
                    <div>
                        {
                            String(type) === BookType.print ?
                            <span>Количество страниц: </span> :
                            <span>Продолжительность: </span>
                        }
                        <span>{ duration }</span>
                    </div>
                </div>
                {
                    progressInfo && String(book.type) === BookType.print ?
                        <div className="book__progress book_shadowed"
                             style={{width: this.getProgressWidth(book, progressInfo) }}
                        >
                        </div> :
                        null
                }

                {
                    this.state.mouseEntered && progressInfo ?
                        <div className="book__status book_shadowed">

                            <div>
                                <span>{ progressInfo.currentProgress }</span>
                                /
                                <span>{ book.duration }</span>
                            </div>

                            <input onBlur={(event: FocusEvent<HTMLInputElement>) => this.updateProgress(event.target.value)}
                                   onKeyUp={this.acceptProgress}
                                   type="text"
                            />

                        </div> :
                        null
                } 
            </div>
        );
    }
}
