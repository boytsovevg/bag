import React, { Component } from 'react';
import './Timeline.scss';

import { books } from '../../../../data/booksData';

import { Book } from '..';

export class Timeline extends Component {

    render() {
        return (
            <ul className="timeline">
                <li className="timeline__grade" id="grade">
                    <div className="books">
                        {
                            books.map(book => <Book key={book.author + book.title} {...book}/>)
                        }
                    </div>
                </li>
            </ul>
        )
    }
}