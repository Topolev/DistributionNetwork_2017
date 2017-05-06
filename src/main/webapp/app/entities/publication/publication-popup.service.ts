import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Publication } from './publication.model';
import { PublicationService } from './publication.service';
@Injectable()
export class PublicationPopupService {
    private isOpen = false;
    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private publicationService: PublicationService

    ) {}

    open(component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.publicationService.find(id).subscribe((publication) => {
                publication.createdDate = this.datePipe
                    .transform(publication.createdDate, 'yyyy-MM-ddThh:mm');
                this.publicationModalRef(component, publication);
            });
        } else {
            return this.publicationModalRef(component, new Publication());
        }
    }

    publicationModalRef(component: Component, publication: Publication): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.publication = publication;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        });
        return modalRef;
    }
}
