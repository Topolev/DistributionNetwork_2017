import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { SubCategory } from './sub-category.model';
import { SubCategoryPopupService } from './sub-category-popup.service';
import { SubCategoryService } from './sub-category.service';
import { Publication, PublicationService } from '../publication';
import { Category, CategoryService } from '../category';

@Component({
    selector: 'jhi-sub-category-dialog',
    templateUrl: './sub-category-dialog.component.html'
})
export class SubCategoryDialogComponent implements OnInit {

    subCategory: SubCategory;
    authorities: any[];
    isSaving: boolean;

    publications: Publication[];

    categories: Category[];
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private subCategoryService: SubCategoryService,
        private publicationService: PublicationService,
        private categoryService: CategoryService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['subCategory']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.publicationService.query().subscribe(
            (res: Response) => { this.publications = res.json(); }, (res: Response) => this.onError(res.json()));
        this.categoryService.query().subscribe(
            (res: Response) => { this.categories = res.json(); }, (res: Response) => this.onError(res.json()));
    }
    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.subCategory.id !== undefined) {
            this.subCategoryService.update(this.subCategory)
                .subscribe((res: SubCategory) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        } else {
            this.subCategoryService.create(this.subCategory)
                .subscribe((res: SubCategory) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        }
    }

    private onSaveSuccess(result: SubCategory) {
        this.eventManager.broadcast({ name: 'subCategoryListModification', content: 'OK'});
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

    trackPublicationById(index: number, item: Publication) {
        return item.id;
    }

    trackCategoryById(index: number, item: Category) {
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
    selector: 'jhi-sub-category-popup',
    template: ''
})
export class SubCategoryPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private subCategoryPopupService: SubCategoryPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.subCategoryPopupService
                    .open(SubCategoryDialogComponent, params['id']);
            } else {
                this.modalRef = this.subCategoryPopupService
                    .open(SubCategoryDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
