
import Curve from "./Curve";
import Point from "../classes/Point";
import {ConfigCoordinatePanel} from "../classes/ConfigCoordinatePanel";
import * as util from "../classes/UtilCanvas";


export default class PointsRelativeCurve extends Curve{
    points: Array<Point> = [];
    baseValue: number;

    constructor(){
        super();
    }

    public draw(ctx: CanvasRenderingContext2D, config: ConfigCoordinatePanel) {

        var pointPrev = this.points[0];
        for (var i = 1; i < this.points.length; i++) {
            util.drawLine(ctx,
                util.xOriginToFactLog(+pointPrev.x * this.baseValue , config), util.yOriginToFactLog(+pointPrev.y, config),
                util.xOriginToFactLog(+this.points[i].x * this.baseValue, config), util.yOriginToFactLog(+this.points[i].y, config), "red");
            pointPrev = this.points[i];
        }
    }

    public drawHorizontalLine(ctx: CanvasRenderingContext2D, config: ConfigCoordinatePanel, xOrigin: number) {
        if ((+this.points[0].x  < xOrigin /this.baseValue ) && (+this.points[this.points.length - 1].x  > xOrigin /this.baseValue  )) {
            var prevPoint = this.points[0];
            var i = 0;
            while (prevPoint.x  < xOrigin /this.baseValue   && i < this.points.length) {
                prevPoint = this.points[++i];
            }

            var fn = this.approximationByLine(this.points[i - 1], prevPoint);
            let yOrigin = fn(xOrigin / this.baseValue);
            console.log(xOrigin, yOrigin);
            this.drawHorizontalLineFromXOriginToEndWorkspace(xOrigin, yOrigin, ctx, config);
        }
    }

    private approximationByLine(point1: Point, point2: Point): (x: number) => number {
        let x1 = +point1.x, y1 = +point1.y;
        let x2 = +point2.x, y2 = +point2.y;
        let k = (y2 - y1) / (x2 - x1);
        let b = (y1 * x2 - x1 * y2) / (x2 - x1);
        return (x) => k * x + b;
    }
}
