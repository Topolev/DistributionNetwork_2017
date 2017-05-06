import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { Publication } from './publication.model';
import { PublicationPopupService } from './publication-popup.service';
import { PublicationService } from './publication.service';
import { Label, LabelService } from '../label';
import { SubCategory, SubCategoryService } from '../sub-category';

@Component({
    selector: 'jhi-publication-dialog',
    templateUrl: './publication-dialog.component.html'
})
export class PublicationDialogComponent implements OnInit {

    publication: Publication;
    authorities: any[];
    isSaving: boolean;

    labels: Label[];

    jusers: JUser[];

    subcategories: SubCategory[];
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private publicationService: PublicationService,
        private labelService: LabelService,
        private jUserService: JUserService,
        private subCategoryService: SubCategoryService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['publication']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.labelService.query().subscribe(
            (res: Response) => { this.labels = res.json(); }, (res: Response) => this.onError(res.json()));
        this.jUserService.query().subscribe(
            (res: Response) => { this.jusers = res.json(); }, (res: Response) => this.onError(res.json()));
        this.subCategoryService.query().subscribe(
            (res: Response) => { this.subcategories = res.json(); }, (res: Response) => this.onError(res.json()));
    }
    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.publication.id !== undefined) {
            this.publicationService.update(this.publication)
                .subscribe((res: Publication) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        } else {
            this.publicationService.create(this.publication)
                .subscribe((res: Publication) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        }
    }

    private onSaveSuccess(result: Publication) {
        this.eventManager.broadcast({ name: 'publicationListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError(error) {
        try {
            error.json();
        } catch (exception) {
            error.message = error.text();
        }
        this.isSaving = false;
        this.onError(error);
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }

    trackLabelById(index: number, item: Label) {
        return item.id;
    }

    trackJUserById(index: number, item: JUser) {
        return item.id;
    }

    trackSubCategoryById(index: number, item: SubCategory) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-publication-popup',
    template: ''
})
export class PublicationPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private publicationPopupService: PublicationPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.publicationPopupService
                    .open(PublicationDialogComponent, params['id']);
            } else {
                this.modalRef = this.publicationPopupService
                    .open(PublicationDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
