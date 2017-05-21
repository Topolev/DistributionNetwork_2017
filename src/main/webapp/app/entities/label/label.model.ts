import { Publication } from '../publication';
export class Label {
    constructor(
        public id?: number,
        public name?: string,
        public publications?: Publication,
    ) {
    }
}
