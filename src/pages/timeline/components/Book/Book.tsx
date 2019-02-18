import React, { KeyboardEvent, FocusEvent, Component } from 'react';
import './Book.scss';

import { BookContract, BookProgressInfoContract } from '../../../../contracts';
import { BookStatus } from '../../../../enums';

interface Props {
    book: BookContract;
    progressInfo?: BookProgressInfoContract;
    updateCurrentProgress: (value: BookProgressInfoContract) => void;
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
        return 270 - 270 * progressInfo.currentProgress / book.pagesNumber;
    };

    updateProgress = (value: string) => {
        const pageNumber = parseInt(value, 10);

        if (!isNaN(pageNumber)) {

            const { book, progressInfo } = this.props;

            const progress = pageNumber >= book.pagesNumber ?
                {
                    ...progressInfo,
                    status: BookStatus.complete,
                    currentProgress: book.pagesNumber
                } :
                {
                    ...progressInfo,
                    currentProgress: pageNumber
                };

            this.props.updateCurrentProgress(progress);
        }
    };

    acceptProgress = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            this.updateProgress(event.currentTarget.value);
        }
    };

    public render() {
        const { book, progressInfo } = this.props;
        const { title, author, url, pagesNumber } = book;

        return (
            <div className="book"
                onMouseEnter={ this.hoverBook }
                onMouseLeave={ this.leaveBook }
            >
                <div className="book__image-container">
                    <img className="book__image"
                            width="270"
                            height="400"
                            src={url}
                            alt={title}
                        />
                    {
                        progressInfo ?
                            <div className="book__progress book_shadowed"
                                    style={{width: this.getProgressWidth(book, progressInfo) }}
                            >
                            </div> :
                            null
                    }
                </div>
                    
                <div className="book__info">
                    <div>{title}</div>
                    <div>{author}</div>
                    <div>
                        <span>Количество страниц: </span>
                        <span>{ pagesNumber }</span>
                    </div>
                </div>

                {
                    this.state.mouseEntered && progressInfo ?
                        <div className="book__status book_shadowed">

                            <div>
                                <span>{ progressInfo.currentProgress }</span>
                                /
                                <span>{ book.pagesNumber }</span>
                            </div>

                            <input onBlur={(event: FocusEvent<HTMLInputElement>) => this.updateProgress(event.target.value)}
                                    onKeyUp={this.acceptProgress}
                                    type="number"
                            />

                        </div> :
                        null
                } 
            </div>
        );
    }
}
