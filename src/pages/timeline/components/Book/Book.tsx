import React, { Component } from 'react';
import './Book.scss';

import { BookContract } from '../../../../contracts';
import { BookType } from '../../../../enums';

interface Props {
    inProgress: boolean;
    book: BookContract;
}

interface State {
    mouseEntered: boolean;
}

export class Book extends Component<Props, State> {

    state = {
        mouseEntered: false
    }

    hoverBook = () => this.setState({ mouseEntered: true });

    leaveBook = () => this.setState({ mouseEntered: false });

    public render() {
        const { title, author, url, type, duration } = this.props.book;

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
                    this.state.mouseEntered && this.props.inProgress ?
                        <div className="book__status">
                            
                        </div> :
                        null
                } 
            </div>
        );
    }
}
