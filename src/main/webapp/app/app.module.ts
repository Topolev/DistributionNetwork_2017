import "./vendor.ts";
import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {Ng2Webstorage} from "ng2-webstorage";
import {DistributionNetworkSharedModule, UserRouteAccessService} from "./shared";
import {DistributionNetworkHomeModule} from "./home/home.module";
import {DistributionNetworkAdminModule} from "./admin/admin.module";
import {DistributionNetworkAccountModule} from "./account/account.module";
import {DistributionNetworkEntityModule} from "./entities/entity.module";
import {
    LayoutRoutingModule,
    JhiMainComponent,
    NavbarComponent,
    FooterComponent,
    ProfileService,
    PageRibbonComponent,
    ActiveMenuDirective,
    ErrorComponent
} from "./layouts";
import {customHttpProvider} from "./blocks/interceptor/http.provider";
import {PaginationConfig} from "./blocks/config/uib-pagination.config";
import {ToolsModule} from "./tools/tools.module";

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        LayoutRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-'}),
        DistributionNetworkSharedModule,
        DistributionNetworkHomeModule,
        DistributionNetworkAdminModule,
        DistributionNetworkAccountModule,
        DistributionNetworkEntityModule,
        ToolsModule
    ],
    declarations: [
        JhiMainComponent,
        NavbarComponent,
        ErrorComponent,
        PageRibbonComponent,
        ActiveMenuDirective,
        FooterComponent
    ],
    providers: [
        ProfileService,
        customHttpProvider(),
        PaginationConfig,
        UserRouteAccessService
    ],
    bootstrap: [ JhiMainComponent ]
})
export class DistributionNetworkAppModule {}
