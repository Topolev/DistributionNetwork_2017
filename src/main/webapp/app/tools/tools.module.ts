import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {RouterModule} from "@angular/router";
import {toolsRoute} from "./tools.route";
import ToolsComponent from "./tools.component";
import TimeCurrentCharacteristicComponent from "./time-current-characteristic/time-current-characteristic.component";
import CoordinatePanelComponent from "./time-current-characteristic/coordinat-panel/coordinate-panel.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

const TOOLS_STATES = [
    ...toolsRoute
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forRoot(TOOLS_STATES, { useHash: true })
    ],
    declarations: [
        TimeCurrentCharacteristicComponent,
        CoordinatePanelComponent,
        ToolsComponent
    ],
    entryComponents: [
        TimeCurrentCharacteristicComponent,
        CoordinatePanelComponent,
        ToolsComponent
    ],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ToolsModule {}
