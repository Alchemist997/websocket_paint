import { makeAutoObservable } from "mobx";

const CanvasState = makeAutoObservable({
    canvas: null,
    socket: null,
    sessionID: null,
    undoList: [],
    redoList: [],
    username: '',

    setCanvas(canvas) {
        this.canvas = canvas;
    },

    setSocket(socket) {
        this.socket = socket;
    },

    setSessionID(id) {
        this.sessionID = id;
    },

    pushToUndo(data) {
        this.undoList.push(data);
    },

    pushToRedo(data) {
        this.redoList.push(data);
    },

    clearRedoList() {
        this.redoList = [];
    },

    setUsername(username) {
        this.username = username;
    },

    undo() {
        const canvas = this.canvas;
        const ctx = canvas.getContext('2d');
        if (this.undoList.length) {
            const dataUrl = this.undoList.pop();
            this.redoList.push(canvas.toDataURL());
            const img = new Image();
            img.src = dataUrl;
            img.onload = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            };
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.heigth);
        }
    },

    redo() {
        if (!this.redoList.length) return;
        const canvas = this.canvas;
        const ctx = canvas.getContext('2d');
        const dataUrl = this.redoList.pop();
        this.undoList.push(canvas.toDataURL());
        const img = new Image();
        img.src = dataUrl;
        img.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        };
    }
});

export default CanvasState;
