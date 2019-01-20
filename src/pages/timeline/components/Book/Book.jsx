import React from 'react';
import './Book.scss';

export const Book = ({title, author, url}) => (
    <div className="book">
        <img src={url} className="book__image" alt={title}/>
        <div className="book__info">
            <div>{title}</div>
            <div>{author}</div>
        </div>
    </div>
);
