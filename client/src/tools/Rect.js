import Tool from "./Tool";
import { bindHandlers, getXCoord, getYCoord, externalDraw, getVisualProps } from './toolsUtils';
import { sendDrawData } from './../utils';

export default class Rect extends Tool {
    constructor(canvas) {
        super(canvas);
        bindHandlers(this);
    }

    mouseUpHandler(e) {
        this.mouseDown = false;
        sendDrawData('rect', getVisualProps(this),
            {
                x: this.startX,
                y: this.startY,
                w: this.width,
                h: this.height
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
        this.width = getXCoord(e) - this.startX;
        this.height = getYCoord(e) - this.startY;
        this.draw(this.ctx, this.startX, this.startY, this.width, this.height);
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
    ctx.rect(...sizeProps);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
}
