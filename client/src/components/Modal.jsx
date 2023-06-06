import { useRef, useEffect } from 'react';
import CanvasState from './../store/canvasState';
import '../styles/modal.scss';

const Modal = ({ closeHandler }) => {
    const inputRef = useRef();

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    function onSubmitHandler(evt) {
        evt.preventDefault();
        const username = inputRef.current.value;
        if (!username) return;
        CanvasState.setUsername(username);
        closeHandler(false);
    }

    return (<div className='modal-bg'>
        <form className="modal" onSubmit={onSubmitHandler}>
            <input type="text" ref={inputRef} placeholder='Ваше имя' />
            <button type='submit'>Присоединиться</button>
        </form>
    </div>);
};

export default Modal;