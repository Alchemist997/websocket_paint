import ToolState from './../store/toolState';

export function bindHandlers(context) {
    context.canvas.onmousemove = context.mouseMoveHandler.bind(context);
    context.canvas.onmousedown = context.mouseDownHandler.bind(context);
    context.canvas.onmouseup = context.mouseUpHandler.bind(context);
}

export function getXCoord(e) {
    return e.pageX - e.target.offsetLeft;
}

export function getYCoord(e) {
    return e.pageY - e.target.offsetTop;
}

export function getXYCoords(e) {
    return [getXCoord(e), getYCoord(e)];
}

export function externalDraw(callback, ctx, visualProps) {
    const [lineWidth, stroke, fill] = [ctx.lineWidth, ctx.strokeStyle, ctx.fillStyle];

    ctx.lineWidth = visualProps.lineWidth;
    ctx.strokeStyle = visualProps.strokeStyle;
    ctx.fillStyle = visualProps.fillStyle;
    callback();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = stroke;
    ctx.fillStyle = fill;
}

export function getVisualProps(scope) {
    return {
        lineWidth: scope.ctx.lineWidth,
        strokeStyle: scope.ctx.strokeStyle,
        fillStyle: scope.ctx.fillStyle
    };
}

export function getIsActive(toolName) {
    return ToolState.tool?.toolName === toolName ? 'active' : '';
}