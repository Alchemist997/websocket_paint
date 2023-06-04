import Tool from "./Tool";
import { bindHandlers, getXCoord, getYCoord } from './toolsUtils';

export default class Rect extends Tool {
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
        this.startX = getXCoord(e);
        this.startY = getYCoord(e);
        this.saved = this.canvas.toDataURL();
    }
    mouseMoveHandler(e) {
        if (!this.mouseDown) return;
        const width = getXCoord(e) - this.startX;
        const height = getYCoord(e) - this.startY;
        this.draw(this.ctx, this.startX, this.startY, width, height);
    }

    draw(ctx, x, y, w, h) {
        const img = new Image();
        img.src = this.saved;
        img.onload = () => {
            const canvas = this.canvas;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            ctx.beginPath();
            ctx.rect(x, y, w, h);
            ctx.fill();
            ctx.stroke();
        };
    }
}
