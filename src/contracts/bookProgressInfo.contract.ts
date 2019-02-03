import { BookStatus } from '../enums';

export interface BookProgressInfoContract {
    bookId: number;
    status: BookStatus;
    currentProgress?: number;
}
