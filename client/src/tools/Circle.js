import Tool from "./Tool";
import { bindHandlers, getVisualProps, getXCoord, getYCoord, externalDraw } from './toolsUtils';
import { sendDrawData } from './../utils';

export default class Circle extends Tool {
    constructor(canvas) {
        super(canvas);
        bindHandlers(this);
    }

    mouseUpHandler(e) {
        this.mouseDown = false;
        sendDrawData('circle', getVisualProps(this),
            {
                x: this.startX,
                y: this.startY,
                r: this.r
            });
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
        this.r = Math.sqrt(width ** 2 + height ** 2);
        this.draw(this.ctx, this.startX, this.startY, this.r);
    }

    draw(ctx, ...sizeProps) {
        const img = new Image();
        img.src = this.saved;
        img.onload = () => {
            const canvas = this.canvas;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            drawFigure(ctx, ...sizeProps);
        };
    }

    static drawStatic(ctx, visualProps, ...sizeProps) {
        externalDraw(() => { drawFigure(ctx, ...sizeProps); }, ctx, visualProps);
    }
}

function drawFigure(ctx, ...sizeProps) {
    ctx.beginPath();
    ctx.arc(...sizeProps, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
}
