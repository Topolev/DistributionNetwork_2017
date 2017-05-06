import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager , JhiLanguageService  } from 'ng-jhipster';

import { Publication } from './publication.model';
import { PublicationService } from './publication.service';

@Component({
    selector: 'jhi-publication-detail',
    templateUrl: './publication-detail.component.html'
})
export class PublicationDetailComponent implements OnInit, OnDestroy {

    publication: Publication;
    private subscription: any;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: EventManager,
        private jhiLanguageService: JhiLanguageService,
        private publicationService: PublicationService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['publication']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPublications();
    }

    load(id) {
        this.publicationService.find(id).subscribe((publication) => {
            this.publication = publication;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPublications() {
        this.eventSubscriber = this.eventManager.subscribe('publicationListModification', (response) => this.load(this.publication.id));
    }
}
