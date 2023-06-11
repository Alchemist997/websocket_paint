import Tool from "./Tool";
import { bindHandlers, getXCoord, getYCoord, getXYCoords, externalDraw, getVisualProps } from './toolsUtils';
import { sendDrawData } from './../utils';

export default class Pencil extends Tool {
    constructor(canvas) {
        super(canvas, 'pencil');
        bindHandlers(this);
    }

    mouseUpHandler(e) {
        this.mouseDown = false;
        sendDrawData('finish');
    }

    mouseDownHandler(e) {
        this.mouseDown = true;
        this.ctx.beginPath();
        this.ctx.moveTo(...getXYCoords(e));
    }

    mouseMoveHandler(e) {
        if (!this.mouseDown) return;
        sendDrawData('pencil', getVisualProps(this),
            {
                x: getXCoord(e),
                y: getYCoord(e)
            });
    }

    static drawStatic(ctx, visualProps, x, y) {
        externalDraw(() => {
            ctx.lineTo(x, y);
            ctx.stroke();
        }, ctx, visualProps);

    }
}
