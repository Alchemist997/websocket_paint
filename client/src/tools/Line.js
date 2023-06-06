import Tool from "./Tool";
import { bindHandlers, getVisualProps, getXCoord, getYCoord, getXYCoords, externalDraw } from './toolsUtils';
import { sendDrawData } from './../utils';

export default class Line extends Tool {
    constructor(canvas) {
        super(canvas);
        bindHandlers(this);
    }

    mouseUpHandler(e) {
        this.mouseDown = false;
        sendDrawData('line', getVisualProps(this),
            {
                startX: this.startX,
                startY: this.startY,
                x: getXCoord(e),
                y: getYCoord(e)
            });
    }

    mouseDownHandler(e) {
        this.mouseDown = true;
        this.startX = getXCoord(e);
        this.startY = getYCoord(e);
        this.ctx.beginPath();
        this.ctx.moveTo(this.startX, this.startY);
        this.saved = this.canvas.toDataURL();
    }

    mouseMoveHandler(e) {
        if (!this.mouseDown) return;
        this.draw(this.ctx, ...getXYCoords(e));
    }


    draw(ctx, ...sizeProps) {
        const img = new Image();
        img.src = this.saved;
        img.onload = () => {
            const canvas = this.canvas;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            drawFigure(ctx, this.startX, this.startY, ...sizeProps);
        };

    }

    static drawStatic(ctx, visualProps, ...sizeProps) {
        externalDraw(() => { drawFigure(ctx, ...sizeProps); }, ctx, visualProps);
    }
}

function drawFigure(ctx, startX, startY, ...sizeProps) {
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(...sizeProps);
    ctx.stroke();
    ctx.beginPath();
}
