import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { DistributionNetworkPublicationModule } from './publication/publication.module';
import { DistributionNetworkCategoryModule } from './category/category.module';
import { DistributionNetworkSubCategoryModule } from './sub-category/sub-category.module';
import { DistributionNetworkLabelModule } from './label/label.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        DistributionNetworkJUserModule,
        DistributionNetworkPublicationModule,
        DistributionNetworkCategoryModule,
        DistributionNetworkSubCategoryModule,
        DistributionNetworkLabelModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DistributionNetworkEntityModule {}
