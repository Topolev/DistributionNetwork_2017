import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils, EventManager } from 'ng-jhipster';
import { DistributionNetworkTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { PublicationDetailComponent } from '../../../../../../main/webapp/app/entities/publication/publication-detail.component';
import { PublicationService } from '../../../../../../main/webapp/app/entities/publication/publication.service';
import { Publication } from '../../../../../../main/webapp/app/entities/publication/publication.model';

describe('Component Tests', () => {

    describe('Publication Management Detail Component', () => {
        let comp: PublicationDetailComponent;
        let fixture: ComponentFixture<PublicationDetailComponent>;
        let service: PublicationService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DistributionNetworkTestModule],
                declarations: [PublicationDetailComponent],
                providers: [
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    PublicationService,
                    EventManager
                ]
            }).overrideComponent(PublicationDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PublicationDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PublicationService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Publication(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.publication).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
