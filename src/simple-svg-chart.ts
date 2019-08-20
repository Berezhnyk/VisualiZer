"use strict";
import { BaseSvgChart, IBaseChartOptions } from "./common/base-svg-chart";
import { ArrayUtil } from "./utils/array-util";

export interface ISimpleSvgChartConfig extends ISimpleSvgChartOptions {
    container: HTMLElement;
}

export interface ISimpleSvgChartOptions extends IBaseChartOptions {
    progressStartColor?: string;
    progressEndColor?: string;
    lineColor?: string;
}

const DEFAULT_OPTIONS: ISimpleSvgChartOptions = {
    background: "lightgray",
    fontColor: 'black',
    fontFamily: 'Arial',
    fontSize: '16px',
    height: 500,
    lineColor: 'black',
    progressEndColor: "rgba(255, 255, 255, 1)",
    progressStartColor: "rgba(100, 170, 255, 0.5)",
    width: 600,
};

export class SimpleSvgChart extends BaseSvgChart {

    //#region properties
    public hidePipsReflection: boolean;
    //#endregion properties

    //#region protected
    protected options: ISimpleSvgChartOptions;
    //#endregion protected

    //#region constants
    
    //#endregion constants

    //#region members
    
    private _values: number[] = [];
    //#endregion members

    constructor(config: ISimpleSvgChartConfig) {
        super(config);
        this.container = config.container;
        this.options = ArrayUtil.extend({}, DEFAULT_OPTIONS, config);
        this.init();
    }

    //#region publics

    public updateLine(values: number[]): void {
        this._values = values;
        this.setNeedsUpdate();
    }
    //#endregion publics

    //#region overrides
    // ** Draw the simple chart */
    protected draw(): void {
        super.draw();
        this.drawLine(this._values);
    }

    //#endregion overrides
}
