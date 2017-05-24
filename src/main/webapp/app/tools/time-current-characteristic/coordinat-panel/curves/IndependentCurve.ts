
import Curve from "./Curve";
import {ConfigCoordinatePanel} from "../classes/ConfigCoordinatePanel";
import {StringArray} from "./BuilderCurves";
import * as util from "../classes/UtilCanvas";


export default class IndependentCurve extends Curve {

    variables: Array<StringArray>;
    fn: (x: number) => number;

    constructor() {
        super();
    }

    draw(ctx: CanvasRenderingContext2D, config: ConfigCoordinatePanel) {

        let tsz = +this.variables['tsz'];
        let Isz = +this.variables['Isz'];

        let yTop = (config.height - 2 * config.marginY) / config.scaleMouse ;

        let xRight = (config.width - 2 * config.marginX) / config.scaleMouse;
        util.drawLine(ctx,
            +util.xOriginToFactLog(Isz, config), util.yOriginToFactLog(yTop, config),
            +util.xOriginToFactLog(Isz, config), util.yOriginToFactLog(tsz, config), "red");

        util.drawLine(ctx,
            +util.xOriginToFactLog(Isz, config), +util.yOriginToFactLog(tsz, config),
            +util.xOriginToFactLog(xRight, config), +util.yOriginToFactLog(tsz, config), "red");
    }

    drawHorizontalLine(ctx: CanvasRenderingContext2D, config: ConfigCoordinatePanel, xOrigin: number) {
        let yOrigin = +this.fn(xOrigin);
        if (xOrigin  > +this.variables['Isz']) {
            this.drawHorizontalLineFromXOriginToEndWorkspace(xOrigin, yOrigin, ctx, config);
        }
    }
}
