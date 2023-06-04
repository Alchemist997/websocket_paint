import Tool from "./Tool";
import { bindHandlers, getXCoord, getXYCoords, getYCoord } from './toolsUtils';


export default class Line extends Tool {
    constructor(canvas) {
        super(canvas);
        bindHandlers(this);
    }

    mouseDownHandler(e) {
        this.mouseDown = true;
        this.currentX = getXCoord(e);
        this.currentY = getYCoord(e);
        this.ctx.beginPath();
        this.ctx.moveTo(this.currentX, this.currentY);
        this.saved = this.canvas.toDataURL();
    }

    mouseUpHandler(e) {
        this.mouseDown = false;
    }

    mouseMoveHandler(e) {
        if (!this.mouseDown) return;
        this.draw(this.ctx, ...getXYCoords(e));
    }


    draw(ctx, x, y) {
        const img = new Image();
        img.src = this.saved;
        img.onload = () => {
            const canvas = this.canvas;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            ctx.beginPath();
            ctx.moveTo(this.currentX, this.currentY);
            ctx.lineTo(x, y);
            ctx.stroke();
        };

    }
}
