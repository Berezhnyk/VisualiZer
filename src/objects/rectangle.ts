import { ArrayUtil } from "../utils/array-util";
import { Point } from "./point";
import { Size } from "./size";

export class Rectangle {
    public set x (value: number) {
        this.location.x = value;
    }

    public get x (): number {
        return this.location.x;
    }

    public set y (value: number) {
        this.location.y = value;
    }

    public get y (): number {
        return this.location.y;
    }

    public set height (value: number) {
        this.size.height = value;
    }
    
    public get height (): number {
        return this.size.height;
    }

    public set width (value: number) {
        this.size.width = value;
    }
    
    public get width (): number {
        return this.size.width;
    }

    public location: Point;
    public size: Size;

    constructor(point?: Point, size?: Size) {
        this.location = ArrayUtil.extend({
            x: 0,
            y: 0
        }, point);
        this.size = ArrayUtil.extend({
            height: 0,
            width: 0,
        }, size);
    }
}