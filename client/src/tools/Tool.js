import ToolState from '../store/toolState';

export default class Tool {
    constructor(canvas, toolName) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.ctx.fillStyle = ToolState.fillColor;
        this.ctx.strokeStyle = ToolState.strokeColor;
        this.ctx.lineWidth = ToolState.lineWidth;
        this.toolName = toolName;
        this.destroyEvents();
    }

    set fillColor(color) {
        this.ctx.fillStyle = color;
    }
    set strokeColor(color) {
        this.ctx.strokeStyle = color;
    }
    set lineWidth(width) {
        this.ctx.lineWidth = width;
    }

    destroyEvents() {
        this.canvas.onmousemove = null;
        this.canvas.onmousedown = null;
        this.canvas.onmouseup = null;
    }
}
