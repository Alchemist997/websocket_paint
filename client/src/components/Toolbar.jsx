import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import toolState from "../store/toolState";
import canvasState from "../store/canvasState";
import Pencil from "../tools/Pencil";
import Rect from "../tools/Rect";
import Line from "../tools/Line";
import Circle from "../tools/Circle";
import SVG from './../assets/img/svg/SVGSprite';
import { getIsActive } from './../tools/toolsUtils';
import '../styles/toolbar.scss';

const Toolbar = observer(() => {
    const [isShowUsersList, setIsShowUsersList] = useState(false);
    const isMultiplayer = canvasState.users.length > 1;
    const canvas = canvasState.canvas;

    const changeColor = e => {
        const value = e.target.value;
        toolState.setStrokeColor(value);
        toolState.setFillColor(value);
    };

    const download = () => {
        const dataUrl = canvas.toDataURL();
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = canvasState.sessionID + '.jpg';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <header className="toolbar">
            {isShowUsersList &&
                <div className="toolbar__users-list">
                    {canvasState.users.map(el => <div>{el}</div>)}
                </div>
            }

            <div className='toolbar__group toolbar__group-start'>
                <button
                    className={`toolbar__btn ${isShowUsersList ? 'active' : ''}`}
                    title='Пользователи'
                    onClick={() => { setIsShowUsersList(prev => !prev) }}
                >
                    <SVG name='users' />
                </button>
            </div>

            <div className='toolbar__group'>
                <button
                    className={`toolbar__btn ${getIsActive('pencil')}`}
                    title='Карандаш'
                    onClick={() => {
                        toolState.setTool(new Pencil(canvas));
                    }}
                >
                    <SVG name='pencil' />
                </button>

                <button
                    className={`toolbar__btn ${getIsActive('line')}`}
                    title='Линия'
                    onClick={() => {
                        toolState.setTool(new Line(canvas));
                    }}>
                    <SVG name='line' />
                </button>

                <button
                    className={`toolbar__btn ${getIsActive('circle')}`}
                    title='Круг'
                    onClick={() => {
                        toolState.setTool(new Circle(canvas));
                    }}>
                    <SVG name='circle' />
                </button>

                <button
                    className={`toolbar__btn ${getIsActive('rect')}`}
                    title='Прямоугольник'
                    onClick={() => {
                        toolState.setTool(new Rect(canvas));
                    }}>
                    <SVG name='rect' />
                </button>
            </div>

            <div className='toolbar__group'>
                <label className="toolbar__btn btn-wide">
                    Заливка
                    <div className="btn__color" style={{ backgroundColor: toolState.fillColor }} />
                    <input type="color"
                        value={toolState?.color ?? '#555555'}
                        onChange={changeColor} />
                </label>

                <label className="toolbar__btn btn-wide">
                    Граница
                    <div className="btn__color" style={{ backgroundColor: toolState.strokeColor }} />
                    <input type="color"
                        value={toolState?.color ?? '#cccccc'}
                        onChange={e => { toolState.setStrokeColor(e.target.value); }} />
                </label>

                <label className="toolbar__btn btn-wide btn-range">
                    Толщина
                    <input
                        onChange={e => { toolState.setLineWidth(e.target.value); }}
                        type="range" defaultValue={5} min={1} max={100} step={1} />
                </label>
            </div>

            <div className='toolbar__group toolbar__group-end'>
                <button
                    className="toolbar__btn"
                    disabled={isMultiplayer}
                    title='Отменить'
                    onClick={() => {
                        canvasState.undo();
                    }}>
                    <SVG name='undo' />
                </button>

                <button
                    className="toolbar__btn"
                    disabled={isMultiplayer}
                    title='Повторить'
                    onClick={() => {
                        canvasState.redo();
                    }}>
                    <SVG name='redo' />
                </button>

                <button
                    className="toolbar__btn btn-save"
                    title='Сохранить'
                    onClick={download}>
                    <SVG name='download_img' />
                </button>
            </div>
        </header >
    );
});

export default Toolbar;
