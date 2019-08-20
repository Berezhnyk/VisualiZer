export abstract class DrawableObject {
    private readonly _redrawTime = 50;  
    private _isNeedUpdate: boolean = false;
    private _animationId: number;
    private _inUpdateProcess: boolean = false;
    

    constructor() {
        this._animationId = requestAnimationFrame(() => this._animate());
    }

    protected setNeedsUpdate(): void {
        this._isNeedUpdate = true;
    }

    protected draw(): void {
        throw new Error("Should be overridden");
    }

    protected destroy(): void {
        clearTimeout(this._animationId);
    }

    private _animate(): void {
        if (this._isNeedUpdate && !this._inUpdateProcess) {
            this._isNeedUpdate = false;
            this._inUpdateProcess = true;
            this.draw();
            setInterval(() => {
                this._animationId = requestAnimationFrame(() => {
                    this._inUpdateProcess = false;
                    this._animate();
                });
            }, this._redrawTime);
        }
    }
}