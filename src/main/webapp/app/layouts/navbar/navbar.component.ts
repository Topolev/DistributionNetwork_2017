import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {JhiLanguageService} from 'ng-jhipster';

import {ProfileService} from '../profiles/profile.service'; // FIXME barrel doesn't work here
import {JhiLanguageHelper, Principal, LoginModalService, LoginService} from '../../shared';
import {trigger, state, style, animate, transition} from '@angular/animations';
import {VERSION, DEBUG_INFO_ENABLED} from '../../app.constants';

@Component({
    selector: 'jhi-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: [
        'navbar.scss'
    ],
    animations:[
        trigger("search",[
            state('hidden', style({width: 0, overflow: 'hidden'})),
            state('show', style({width: '100%'})),
            state('hidden-loop', style({width:'0', overflow: 'hidden'})),
            state('show-loop', style({width:'auto'})),
            transition('* => *', animate('1000ms ease-in-out')),
        ])
    ]
})
export class NavbarComponent implements OnInit {

    inProduction: boolean;

    languages: any[];
    swaggerEnabled: boolean;
    modalRef: NgbModalRef;
    version: string;

    isNavbarCollapsed: boolean;

    constructor(private loginService: LoginService,
                private languageHelper: JhiLanguageHelper,
                private languageService: JhiLanguageService,
                private principal: Principal,
                private loginModalService: LoginModalService,
                private profileService: ProfileService,
                private router: Router) {
        this.version = DEBUG_INFO_ENABLED ? 'v' + VERSION : '';
        this.isNavbarCollapsed = false;
        this.languageService.addLocation('home');
    }

    ngOnInit() {
        this.languageHelper.getAll().then((languages) => {
            this.languages = languages;
        });

        this.profileService.getProfileInfo().subscribe((profileInfo) => {
            this.inProduction = profileInfo.inProduction;
            this.swaggerEnabled = profileInfo.swaggerEnabled;
        });
    }

    changeLanguage(languageKey: string) {
        this.languageService.changeLanguage(languageKey);
    }

    collapseNavbar() {
        this.isNavbarCollapsed = true;
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }

    logout() {
        this.collapseNavbar();
        this.loginService.logout();
        this.router.navigate(['']);
    }

    toggleNavbar() {
        this.isNavbarCollapsed = !this.isNavbarCollapsed;
    }

    getImageUrl() {
        return this.isAuthenticated() ? this.principal.getImageUrl() : null;
    }


}
