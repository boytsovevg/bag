import React from 'react';
import './Header.scss';

export const Header = () => (
    <header className="header flex flex_justify_spaced flex_align_centered">
        <h2>Если бы я осознал раньше, почему стоит тратить время на чтение, то здесь было бы больше книг</h2>
        <img className="header__image"
            width="32"
            height="32"
            src="https://lh3.googleusercontent.com/-PcD1dV3zQ3Y/AAAAAAAAAAI/AAAAAAAAAAA/ACevoQMlnvXEghcpxtbA68hb9wKaT0YPqA/s32-c-mo/photo.jpg"
            alt=""
        />
    </header>
);
