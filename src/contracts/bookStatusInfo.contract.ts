import { BookStatus } from './../enums/bookStatus.enum';

export interface BookStatusInfoContract {
    bookId: number;
    status: BookStatus;
    currentProgress?: number | string;
}
