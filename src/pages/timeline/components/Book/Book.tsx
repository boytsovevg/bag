import React, { Component } from 'react';
import './Book.scss';

import { BookContract, BookProgressInfoContract } from '../../../../contracts';
import { BookType } from '../../../../enums';

interface Props {
    book: BookContract;
    progressInfo?: BookProgressInfoContract;
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
                    this.state.mouseEntered && progressInfo ?
                        <div className="book__status">
                            <span>{ progressInfo.currentProgress }</span>
                            /
                            <span>{ book.duration }</span>
                        </div> :
                        null
                } 
            </div>
        );
    }
}
