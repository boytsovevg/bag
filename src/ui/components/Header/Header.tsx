import React from 'react';
import './Header.scss';

export const Header = () => (
    <header className="header flex flex_justify_spaced">
        <h1>Books and Grades</h1>
        <span className="header__time-ago flex flex_align_ended">many years ago...</span>
    </header>
);
