import Tool from "./Tool";
import { bindHandlers, getXYCoords } from './toolsUtils';

export default class Pencil extends Tool {
    constructor(canvas) {
        super(canvas);
        bindHandlers(this);
    }

    mouseUpHandler(e) {
        this.mouseDown = false;
    }
    mouseDownHandler(e) {
        this.mouseDown = true;
        this.ctx.beginPath();
        this.ctx.moveTo(...getXYCoords(e));
    }
    mouseMoveHandler(e) {
        if (!this.mouseDown) return;
        this.draw(this.ctx, ...getXYCoords(e));
    }

    draw(ctx, x, y) {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}
