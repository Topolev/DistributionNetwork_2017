import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { Publication } from './publication.model';
import { PublicationPopupService } from './publication-popup.service';
import { PublicationService } from './publication.service';

@Component({
    selector: 'jhi-publication-delete-dialog',
    templateUrl: './publication-delete-dialog.component.html'
})
export class PublicationDeleteDialogComponent {

    publication: Publication;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private publicationService: PublicationService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['publication']);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.publicationService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'publicationListModification',
                content: 'Deleted an publication'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-publication-delete-popup',
    template: ''
})
export class PublicationDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private publicationPopupService: PublicationPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.publicationPopupService
                .open(PublicationDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
