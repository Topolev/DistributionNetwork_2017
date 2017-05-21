import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {RouterModule} from "@angular/router";
import {toolsRoute} from "./tools.route";
import ToolsComponent from "./tools.component";
import TimeCurrentCharacteristicComponent from "./time-current-characteristic/time-current-characteristic.component";

const TOOLS_STATES = [
    ...toolsRoute
];

@NgModule({
    imports: [
        RouterModule.forRoot(TOOLS_STATES, { useHash: true })
    ],
    declarations: [
        TimeCurrentCharacteristicComponent,
        ToolsComponent
    ],
    entryComponents: [
        TimeCurrentCharacteristicComponent,
        ToolsComponent
    ],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ToolsModule {}
