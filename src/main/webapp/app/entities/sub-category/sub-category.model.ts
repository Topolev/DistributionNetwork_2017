import { Publication } from '../publication';
import { Category } from '../category';
export class SubCategory {
    constructor(
        public id?: number,
        public name?: string,
        public publications?: Publication,
        public category?: Category,
    ) {
    }
}
