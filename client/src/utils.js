import CanvasState from './store/canvasState';

export function sendDrawData(type, visualProps, otherProps) {
    CanvasState.socket.send(JSON.stringify({
        method: 'draw',
        id: CanvasState.sessionID,
        picture: CanvasState.canvas.toDataURL(),
        figure: {
            type,
            visualProps,
            ...otherProps
        }
    }));
}