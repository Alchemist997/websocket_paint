import { makeAutoObservable } from "mobx";

const ToolState = makeAutoObservable({
    tool: null,
    fillColor: '#222222',
    strokeColor: '#1200b1',
    lineWidth: 5,

    setTool(tool) {
        this.tool = tool;
    },
    setFillColor(color) {
        this.tool.fillColor = color;
        this.fillColor = color;
    },
    setStrokeColor(color) {
        this.tool.strokeColor = color;
        this.strokeColor = color;
    },
    setLineWidth(width) {
        this.tool.lineWidth = width;
        this.lineWidth = width;
    }
});

export default ToolState;