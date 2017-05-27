import Point from "./Point";
export class PointsTemplate {
    label: string;
    points: Point[];
}

export const defaultFusePointTemplates: PointsTemplate[] = [
    {
        label: "ПКТ-101-10, 12.5кА (I=2А)",
        points: [
            {x: 5, y: 1000},
            {x: 6, y: 10},
            {x: 7, y: 2},
            {x: 8, y: 1},
            {x: 9, y: 0.5},
            {x: 10, y: 0.3},
            {x: 20, y: 0.03},
            {x: 25, y: 0.01}
        ]
    }, {
        label: "ПКТ-101-10, 12.5кА (I=3.2А)",
        points: [
            {x: 7, y: 300},
            {x: 10, y: 4},
            {x: 20, y: 0.2},
            {x: 30, y: 0.05},
            {x: 40, y: 0.03},
            {x: 60, y: 0.01},
        ]
    },{
        label: "ПКТ-101-10, 12.5кА (I=5А)",
        points: [
            {x: 14, y: 400},
            {x: 20, y: 2},
            {x: 30, y: 0.3},
            {x: 40, y: 0.15},
            {x: 50, y: 0.07},
            {x: 60, y: 0.05},
            {x: 70, y: 0.03},
            {x: 80, y: 0.02},
            {x: 100, y: 0.01},
        ]
    }
]

export const defaultSwitcherPointTemplates: PointsTemplate[] = [
    {
        label: "B",
        points: [
            {x: 1.25, y: 3600},
            {x: 2.55, y: 60},
            {x: 3, y: 45},
            {x: 5, y: 45},
            {x: 5, y: 0.1},
            {x: 1000, y: 0.1}]
    },
    {
        label: "C",
        points: [
            {x: 1.25, y: 10000},
            {x: 2, y: 200},
            {x: 3, y: 50},
            {x: 4, y: 30},
            {x: 5, y: 20},
            {x: 10, y: 10},
            {x: 10, y: 0.02},
            {x: 200, y: 0.01},


        ]
    }
]