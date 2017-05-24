import {Component} from '@angular/core';
import {ConfigCoordinatePanel, defaultConfig} from "./coordinat-panel/classes/ConfigCoordinatePanel";
import Curve from "./coordinat-panel/curves/Curve";
import {BuilderCurves} from "./coordinat-panel/curves/BuilderCurves";
import {SectionX} from "./coordinat-panel/classes/SectionX";

@Component({
    selector: 'time-current-characteristic',
    templateUrl: './time-current-characteristic.component.html'
})
export default class TimeCurrentCharacteristicComponent{

    configPanel : ConfigCoordinatePanel;
    curves: Array<Curve> = [];
    sectionsX: Array<SectionX> = [];

    builder: BuilderCurves = new BuilderCurves();

    constructor(){
        this.configPanel = defaultConfig;

        this.curves.push(this.builder.buildCurve("POINTSABS"));
        this.curves.push(this.builder.buildCurve("POINTSRELATIVE"));
        this.curves.push(this.builder.buildCurve("EXPRESSION"));
    }

    addSectionX(){
        this.sectionsX = this.sectionsX.concat(new SectionX());
    }
    deleteSectionX(sectionX: SectionX){
        this.sectionsX = this.sectionsX.filter(x => x!= sectionX);
    }
    changeSectionX(){
        this.sectionsX = this.sectionsX.concat();
    }
}
