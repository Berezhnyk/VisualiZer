import { Point } from "../objects/point";
import { Rectangle } from "../objects/rectangle";
import { Size } from "../objects/size";
import { TransformInfo } from "../objects/transform-info";
import { ArrayUtil } from "../utils/array-util";
import { DrawableObject } from './drawable-object';

export interface IBaseChartOptions {
    background?: string;
    width?: number;
    height?: number;
    fontSize?: string;
    fontFamily?: string;
    fontColor?: string;
}

export const EVENTS: any = {
    RESIZED: "scResized"
};

export const EVENT_OBJECTS: any = {
    RESIZED: new CustomEvent(EVENTS.RESIZED)
};

const SiimpleChartTemplate: (width: string, height: string) => string = (width: string, height: string) => `
<div class="sc-container">
<svg viewBox="0 0 ${ width} ${height}" class="chart"> </svg>
</div>
`;

export class BaseSvgChart extends DrawableObject {

    protected container: HTMLElement;
    protected options: IBaseChartOptions
    protected rect: Rectangle;
    private _canvas: SVGSVGElement;

    constructor(options: IBaseChartOptions) {
        super();
        this.options = options;
    }

    public get width(): number {
        return this.options.width;
    }

    public set width(value: number) {
        this.options.width = value;
        this.setNeedsUpdate();
    }

    public get height(): number {
        return this.options.height;
    }

    public set height(value: number) {
        this.options.height = value;
        this.setNeedsUpdate();
    }

    protected adjustSize(): void {
        const canvas: NodeListOf<SVGSVGElement> = this.container.getElementsByTagName("svg");
        if (canvas.length > 0) {
            canvas[0].setAttribute("width", this.options.width.toString());
            canvas[0].setAttribute("height", this.options.height.toString());
            canvas[0].setAttribute("viewBox", `0 0 ${this.options.width} ${this.options.height}`);
            this.rect = new Rectangle(new Point(0, 0), new Size(this.options.width, this.options.height));
        }
    }

    protected initTemplate(): void {
        this.container.innerHTML = SiimpleChartTemplate(this.options.width.toString(), this.options.height.toString());
    }

    protected initHandlers(): void {
        this.container.addEventListener(EVENTS.RESIZED, (e: CustomEvent) => this.adjustSize(), false);
    }

    protected init(): void {
        this.initTemplate();
        this.initHandlers();
        this._canvas = this.container.getElementsByTagName("svg")[0];
        if (!this._canvas) {
            throw new Error("Canvas not found");
        }
        this.rect = new Rectangle(new Point(0, 0), new Size(this.options.width, this.options.height));
    }

    protected draw(): void {
        this.adjustSize();
        this._canvas.innerHTML = '';
        this.drawBackground();
    }

    protected drawLine(values: number[]): void {
        const transformedData = this.transformData(values);

        const points = transformedData.resultPoints.map((point) => {
            const svgPoint = this._canvas.createSVGPoint();
            svgPoint.x = point.x;
            svgPoint.y = point.y;
            return svgPoint;
        });

        this._canvas.innerHTML = `<polyline 
        class="trend-line"
        points=""
        fill="none"
        stroke="#0074d9"
        stroke-width="1"
    />`;

        const polyLine = this._canvas.getElementsByTagName("polyline");
        points.forEach((point) => {
            polyLine[0].points.appendItem(point);
        });
    }

    protected transformData(values: number[]): TransformInfo {
        const area = this.rect;
        let result: TransformInfo = null;
        if (values !== null && values.length > 0) {
            const actualWidth = area.width;
            const hStep = actualWidth / values.length;

            const maxValue = ArrayUtil.max(values);
            const minValue = ArrayUtil.min(values);

            const actualHeight = area.height;
            const maxChange = maxValue - minValue;
            const vStep = actualHeight / maxChange;

            const tmp = new Array<Point>();
            result = new TransformInfo(area, vStep, minValue, values.length);

            let pos = 0;
            for (const value of values) {
                tmp.push(new Point(pos, area.height - (vStep * (value - minValue))));
                pos += hStep;
            }

            let chunkSize = Math.floor(tmp.length / actualWidth);

            let optimized = Array<Point>();

            if (chunkSize > 2) {
                optimized = new Array<Point>();
                let chunkPosition = 0;

                let i = 0;
                while (true) {
                    i++;
                    const chunk = tmp.slice(chunkPosition, chunkPosition + chunkSize);
                    const maxPoint = ArrayUtil.maxBy(chunk, item => item.y);
                    const minPoint = ArrayUtil.minBy(chunk, item => item.y);
                    if (maxPoint !== minPoint) {
                        if (maxPoint.x < minPoint.x) {
                            optimized.push(maxPoint, minPoint);
                        } else {
                            optimized.push(minPoint, maxPoint);
                        }
                    } else {
                        optimized.push(maxPoint);
                    }
                    chunkPosition += chunkSize;

                    const minDifference = tmp.length - chunkPosition;
                    if (minDifference < chunkSize) {
                        chunkSize = minDifference;
                    }

                    if (chunkPosition >= tmp.length) {
                        break;
                    }
                }
            } else {
                optimized = tmp;
            }
            result.resultPoints = optimized;
        }
        return result;
    }

    protected drawBackground(): void {
        // TODO: draw background
    }

    protected drawText(text: string, x: number, y: number): void {
        // TODO: draw text
    }
}
