import { Grade } from '../enums';
import { BookType } from '../pages/timeline/components/Book/bookType.enum';

export interface BookContract {
    id: number;
    title: string;
    author: string;
    url: string,
    grade: Grade,
    type: BookType,
    duration: number | string;
}