import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils, EventManager } from 'ng-jhipster';
import { DistributionNetworkTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { JUserDetailComponent } from '../../../../../../main/webapp/app/entities/j-user/j-user-detail.component';
import { JUserService } from '../../../../../../main/webapp/app/entities/j-user/j-user.service';
import { JUser } from '../../../../../../main/webapp/app/entities/j-user/j-user.model';

describe('Component Tests', () => {

    describe('JUser Management Detail Component', () => {
        let comp: JUserDetailComponent;
        let fixture: ComponentFixture<JUserDetailComponent>;
        let service: JUserService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DistributionNetworkTestModule],
                declarations: [JUserDetailComponent],
                providers: [
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    JUserService,
                    EventManager
                ]
            }).overrideComponent(JUserDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(JUserDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(JUserService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new JUser(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.jUser).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
