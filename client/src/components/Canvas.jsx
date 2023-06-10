import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { observer } from "mobx-react-lite";
import canvasState from "../store/canvasState";
import toolState from "../store/toolState";
import Pencil from "../tools/Pencil";
import Modal from './Modal';
import Rect from './../tools/Rect';
import Line from './../tools/Line';
import Circle from './../tools/Circle';
import "../styles/canvas.scss";

const width = document.documentElement.clientWidth - 200;
const height = document.documentElement.clientHeight - 150;

const Canvas = observer(() => {
    const canvasRef = useRef();
    const params = useParams();
    const [modal, setModal] = useState(true);

    useEffect(() => {
        canvasState.setCanvas(canvasRef.current);
    }, []);

    useEffect(() => {
        if (!canvasState.username) return;

        const socket = new WebSocket('ws://localhost:5000/');
        canvasState.setSocket(socket);
        canvasState.setSessionID(params.id);

        toolState.setTool(new Pencil(canvasState.canvas, socket, params.id));

        socket.onopen = () => {
            console.log('Socket OPEN');
            socket.send(JSON.stringify({
                method: 'connected',
                id: params.id,
                dimensions: { width, height },
                username: canvasState.username
            }));
        };

        socket.onmessage = (evt) => {
            let msg = JSON.parse(evt.data);

            switch (msg.method) {
                case 'connected':
                    console.log(`${msg.username} присоединился`);
                    if (canvasState.dimensions) break;
                    canvasState.setDimensions(
                        msg.dimensions.width,
                        msg.dimensions.height
                    );
                    break;

                case 'draw':
                    drawHandler(msg);
                    break;

                default:
                    break;
            }
        };

    }, [params.id, canvasState.username]);

    function drawHandler(msg) {
        const figure = msg.figure;
        const ctx = canvasState.canvas.getContext('2d');
        switch (figure.type) {
            case 'pencil':
                Pencil.drawStatic(ctx, { ...figure.visualProps }, figure.x, figure.y);
                break;

            case 'line':
                Line.drawStatic(ctx, { ...figure.visualProps }, figure.startX, figure.startY, figure.x, figure.y);
                break;

            case 'circle':
                Circle.drawStatic(ctx, { ...figure.visualProps }, figure.x, figure.y, figure.r);
                break;

            case 'rect':
                Rect.drawStatic(ctx, { ...figure.visualProps }, figure.x, figure.y, figure.w, figure.h);
                break;

            case 'finish':
                ctx.beginPath();
                break;

            default:
                break;
        }
    }

    const mouseDownHandler = () => {
        canvasState.pushToUndo(canvasRef.current.toDataURL());
        canvasState.clearRedoList();
    };

    return (
        <div className="canvas-wrap">
            <canvas
                onMouseDown={mouseDownHandler}
                ref={canvasRef}
                width={canvasState.dimensions?.width ?? 600}
                height={canvasState.dimensions?.height ?? 400}
            />
            {modal ? <Modal closeHandler={setModal} /> : null}
        </div>
    );
});

export default Canvas;
