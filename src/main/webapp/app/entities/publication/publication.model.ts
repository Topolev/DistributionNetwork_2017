import { Label } from '../label';
import { SubCategory } from '../sub-category';
export class Publication {
    constructor(
        public id?: number,
        public name?: string,
        public text?: string,
        public createdDate?: any,
        public labels?: Label,
        public subCategories?: SubCategory,
    ) {
    }
}
