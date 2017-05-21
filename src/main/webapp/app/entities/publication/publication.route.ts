import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { PublicationComponent } from './publication.component';
import { PublicationDetailComponent } from './publication-detail.component';
import { PublicationPopupComponent } from './publication-dialog.component';
import { PublicationDeletePopupComponent } from './publication-delete-dialog.component';

import { Principal } from '../../shared';

export const publicationRoute: Routes = [
  {
    path: 'publication',
    component: PublicationComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'distributionNetworkApp.publication.home.title'
    },
    canActivate: [UserRouteAccessService]
  }, {
    path: 'publication/:id',
    component: PublicationDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'distributionNetworkApp.publication.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const publicationPopupRoute: Routes = [
  {
    path: 'publication-new',
    component: PublicationPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'distributionNetworkApp.publication.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'publication/:id/edit',
    component: PublicationPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'distributionNetworkApp.publication.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'publication/:id/delete',
    component: PublicationDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'distributionNetworkApp.publication.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
