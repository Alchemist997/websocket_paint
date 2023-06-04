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