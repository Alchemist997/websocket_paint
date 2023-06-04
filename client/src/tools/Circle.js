import Tool from "./Tool";
import { bindHandlers, getXCoord, getYCoord } from './toolsUtils';

export default class Circle extends Tool {
    constructor(canvas) {
        super(canvas);
        bindHandlers(this);
    }

    mouseDownHandler(e) {
        this.mouseDown = true;
        const canvasData = this.canvas.toDataURL();
        this.ctx.beginPath();
        this.startX = getXCoord(e);
        this.startY = getYCoord(e);
        this.saved = canvasData;
    }

    mouseUpHandler(e) {
        this.mouseDown = false;
    }

    mouseMoveHandler(e) {
        if (!this.mouseDown) return;
        const width = getXCoord(e) - this.startX;
        const height = getYCoord(e) - this.startY;
        const r = Math.sqrt(width ** 2 + height ** 2);
        this.draw(this.ctx, this.startX, this.startY, r);
    }

    draw(ctx, x, y, r) {
        const img = new Image();
        img.src = this.saved;
        img.onload = () => {
            const canvas = this.canvas;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            ctx.beginPath();
            ctx.arc(x, y, r, 0, 2 * Math.PI);
            ctx.fill();
            ctx.stroke();
        };
    }
}
