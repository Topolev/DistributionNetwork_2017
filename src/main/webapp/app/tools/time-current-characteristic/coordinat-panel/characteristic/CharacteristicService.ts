import {defaultFusePointTemplates, PointsTemplate} from "../classes/PointsTemplate";
export default class BilderCharacteristic{

    private fusePointTemplates:PointsTemplate[] = defaultFusePointTemplates;

    public getFusePointTemplates():PointsTemplate[]{
        return this.fusePointTemplates;
    }

}
