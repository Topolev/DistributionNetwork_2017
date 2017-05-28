import {Component} from '@angular/core';
import {ConfigCoordinatePanel, defaultConfig} from "./coordinat-panel/classes/ConfigCoordinatePanel";
import Curve from "./coordinat-panel/curves/Curve";
import {BuilderCurves} from "./coordinat-panel/curves/BuilderCurves";
import {SectionX} from "./coordinat-panel/classes/SectionX";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Characteristic} from "./coordinat-panel/characteristic/Characteristic";
import {CharacteristicComponent} from "./modals/characteristic.component";
import {CharacteristicService} from "./modals/characteristic.service";
import {defaultFusePointTemplates} from "./coordinat-panel/classes/PointsTemplate";

@Component({
    selector: 'time-current-characteristic',
    templateUrl: './time-current-characteristic.component.html',
    styleUrls: ['./time-current-characteristic.component.scss']
})
export default class TimeCurrentCharacteristicComponent {

    configPanel: ConfigCoordinatePanel;
    characteristics: Array<Characteristic> = [];
    sectionsX: Array<SectionX> = [];

    builder: BuilderCurves = new BuilderCurves();

    constructor(private modalService: NgbModal,
                private characteristicService: CharacteristicService) {
        this.configPanel = defaultConfig;
        this.characteristicService.newCharacteristic$.subscribe(
            characteristic => {
                console.log("new/edited characteristic");
                this.setCharacteristic(characteristic);
            }
        )
    }

    setCharacteristic(characteristic: Characteristic){
        let isExistCharacrteristic = this.characteristics.some(existCharacteristic => existCharacteristic.id === characteristic.id);
        if (isExistCharacrteristic){
            this.characteristics.map(existCharacteristic =>
                existCharacteristic => existCharacteristic.id === characteristic.id ?
                characteristic : existCharacteristic
            );
            this.characteristics = this.characteristics.concat();
        } else{
            this.characteristics = this.characteristics.concat(characteristic);
        }
    }

    changeVisable(characteristic: Characteristic){
        characteristic.visable = !characteristic.visable;
        this.updateCharacteristic();
    }

    updateCharacteristic(){
        this.characteristics = this.characteristics.concat();
    }

    deleteCharacteristic(characteristic: Characteristic){
        this.characteristics = this.characteristics.filter(existCharacteristic => characteristic.id != existCharacteristic.id);
    }


    addSectionX() {
        this.sectionsX = this.sectionsX.concat(new SectionX());
    }

    deleteSectionX(sectionX: SectionX) {
        this.sectionsX = this.sectionsX.filter((x) => x !== sectionX);
    }

    changeSectionX() {
        this.sectionsX = this.sectionsX.concat();
    }

    openModalCreateOrEditCharacteristic(characteristic: Characteristic) {
        this.modalService.open(CharacteristicComponent, {windowClass: 'modal-create-new-graph'});
        /*if (characteristic != null){
            characteristic = JSON.parse(JSON.stringify(characteristic));
        }*/
        this.characteristicService.setCurrentCharacteristic(characteristic);
    }
}
