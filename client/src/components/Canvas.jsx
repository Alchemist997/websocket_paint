import React, { useEffect, useRef } from 'react';
import { observer } from "mobx-react-lite";
import canvasState from "../store/canvasState";
import toolState from "../store/toolState";
import Pencil from "../tools/Pencil";
import "../styles/canvas.scss";

const width = document.documentElement.clientWidth - 200;
const height = document.documentElement.clientHeight - 150;

const Canvas = observer(() => {
    const canvasRef = useRef();

    useEffect(() => {
        canvasState.setCanvas(canvasRef.current);
        toolState.setTool(new Pencil(canvasState.canvas));
    }, []);

    const mouseDownHandler = () => {
        canvasState.pushToUndo(canvasRef.current.toDataURL());
        canvasState.clearRedoList();
    };

    return (
        <div className="canvas-wrap">
            <canvas onMouseDown={mouseDownHandler} ref={canvasRef} width={width} height={height} />
        </div>
    );
});

export default Canvas;
