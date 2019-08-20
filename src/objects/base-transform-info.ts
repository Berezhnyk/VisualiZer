import { Rectangle } from "./rectangle";

export class BaseTransformInfo {

    protected area: Rectangle;
    protected vStep: number;
    protected dataCount: number;
    private min: number;

    constructor (area: Rectangle,  vStep: number, min: number, dataCount: number) {
        this.area = area;
        this.vStep = vStep;
        this.min = min;
        this.dataCount = dataCount;
    }

    //#region properties
    //#endregion properties

    //#region publics
    public transformYPoint(value: number): number {
        return this.area.height - (this.vStep * (value - this.min));
    } 

    public transformXPoint(value: number): number {
        return value * (this.area.width) / this.dataCount;
    }
    //#endregion publics
}