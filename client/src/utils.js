import CanvasState from './store/canvasState';

export function sendDrawData(type, visualProps, otherProps) {
    CanvasState.socket.send(JSON.stringify({
        method: 'draw',
        id: CanvasState.sessionID,
        figure: {
            type,
            visualProps,
            ...otherProps
        }
    }));
}