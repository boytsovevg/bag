import React, { Component } from 'react';
import './Timeline.scss';

import { GradeOrder } from '../../../../enums/grade-order.enum';

import { Book } from '..';

export class Timeline extends Component {

    render() {
        const { timeline } = this.props;

        const gradesList = Array.from(timeline.keys())
            .sort((previousGrade, currentGrade) => GradeOrder[previousGrade] - GradeOrder[currentGrade])
            .map(grade => (
                <li className="timeline__grade" id="grade" key={grade}>
                    <div className="books">
                        {
                            timeline.has(grade) &&
                            timeline.get(grade)
                                .map(book => <Book key={book.author + book.title} {...book}/>)
                        }
                    </div>
                </li>
            ));

        return (
            <ul className="timeline">
                {gradesList}
            </ul>
        )
    }
}