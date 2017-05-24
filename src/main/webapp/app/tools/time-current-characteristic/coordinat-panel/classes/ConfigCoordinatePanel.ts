export class ConfigCoordinatePanel {
    scaleMouse: number;

    maxScale: number;
    minScale: number;

    xInitPxPerDivision: number;
    yInitPxPerDivision: number;

    xDivisionLog: number;
    yDivisionLog: number;


    maxNumberWithinX: number;
    maxNumberWithinY: number;

    marginX: number;
    marginY: number;

    colorMainAxis: string;
    colorIntermediateAxis: string;
    font: string;

    choosenVoltage: number;

    width: number;
    height: number;
}
export const defaultConfig: ConfigCoordinatePanel = {
    scaleMouse: 1,

    maxScale: 5,
    minScale: 0.2,

    xInitPxPerDivision: 100,
    yInitPxPerDivision: 100,

    xDivisionLog: -1,
    yDivisionLog: -1,


    maxNumberWithinX: 12,
    maxNumberWithinY: 20,

    marginX: 50,
    marginY: 50,

    colorMainAxis: "red",
    colorIntermediateAxis: "rgba(0,0,0,0.1)",
    font: "14px Arial",

    choosenVoltage: undefined,

    width: 500,
    height: 500
}