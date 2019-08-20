import { BaseTransformInfo } from "./base-transform-info";
import { Point } from "./point";
import { Rectangle } from "./rectangle";

export class TransformInfo extends BaseTransformInfo {
    public resultPoints: Point[];

    constructor (area: Rectangle,  vStep: number, min: number, dataCount: number) {
       super(area, vStep, min, dataCount);
    }
}