import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DistributionNetworkSharedModule } from '../../shared';
import {
    PublicationService,
    PublicationPopupService,
    PublicationComponent,
    PublicationDetailComponent,
    PublicationDialogComponent,
    PublicationPopupComponent,
    PublicationDeletePopupComponent,
    PublicationDeleteDialogComponent,
    publicationRoute,
    publicationPopupRoute,
} from './';

const ENTITY_STATES = [
    ...publicationRoute,
    ...publicationPopupRoute,
];

@NgModule({
    imports: [
        DistributionNetworkSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        PublicationComponent,
        PublicationDetailComponent,
        PublicationDialogComponent,
        PublicationDeleteDialogComponent,
        PublicationPopupComponent,
        PublicationDeletePopupComponent,
    ],
    entryComponents: [
        PublicationComponent,
        PublicationDialogComponent,
        PublicationPopupComponent,
        PublicationDeleteDialogComponent,
        PublicationDeletePopupComponent,
    ],
    providers: [
        PublicationService,
        PublicationPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DistributionNetworkPublicationModule {}
