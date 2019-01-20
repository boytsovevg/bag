import React, { Component } from 'react';
import './Timeline.scss';

import { books } from '../../../../data/booksData';
import { Book } from '../book/Book';

export class Timeline extends Component {

    componentDidMount() {
        this.booksList = books.map(book =>
            <Book {...book}/>
        );
    }

    render() {
        return (
            <ul className="timeline">
                <li className="timeline__grade" id="grade">
                    <div className="books"></div>
                    {this.booksList}
                </li>
            </ul>
        )
    }
}