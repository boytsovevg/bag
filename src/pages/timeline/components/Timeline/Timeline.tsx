import React, { Component } from 'react';
import './Timeline.scss';

import { Grade, GradeOrder } from '../../../../enums';

import { Book } from '..';
import { BookContract } from '../../../../contracts';

interface Props {
    timeline: Map<Grade, BookContract[]>;
}

export class Timeline extends Component<Props> {

    render() {
        const { timeline } = this.props;

        const gradesList = Array.from(timeline.keys())
            .sort((previousGrade: Grade, currentGrade: Grade) => GradeOrder[previousGrade] - GradeOrder[currentGrade])
            .map((grade: Grade) => (
                <li className="timeline__grade" key={ grade }>
                    <div className="books">
                        {
                            timeline.has(grade) &&
                            timeline.get(grade)
                                .map(book => <Book key={ book.id } { ...book } />)
                        }
                    </div>
                    <div className="timeline__grade-name">
                        { grade }
                    </div>
                </li>
            ));

        return (
            <ul className="timeline">
                { gradesList }
            </ul>
        )
    }
}