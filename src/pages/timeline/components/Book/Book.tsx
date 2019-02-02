import React, { Component } from 'react';
import './Book.scss';

import { BookContract } from '../../../../contracts';

interface Props {
    book: BookContract;
}

interface State {
    mouseEntered: boolean;
}

export class Book extends Component<Props, State> {

    state = {
        mouseEntered: false
    }

    public render() {
        const { title, author, url } = this.props.book;

        return (
            <div className="book">
                <img src={url} className="book__image" alt={title}/>
                <div className="book__info">
                    <div>{title}</div>
                    <div>{author}</div>
                </div>

                <div className="book__status"></div>
            </div>
        );
    }
}
