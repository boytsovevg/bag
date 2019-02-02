import { BookStatus } from '../enums/bookStatus.enum';

export interface BookProgressInfoContract {
    bookId: number;
    status: BookStatus;
    currentProgress?: number | string;
}
