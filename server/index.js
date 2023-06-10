const express = require('express');
const app = express();
const WSServer = require('express-ws')(app);
const aWss = WSServer.getWss();
const PORT = process.env.PORT || 5000;

const sessions = {};

app.ws('/', (ws) => {
    ws.on('message', msg => {
        msg = JSON.parse(msg);

        switch (msg.method) {
            case 'connected':
                connectedHandler(ws, msg);
                break;

            case 'draw':
                broadcastConnection(ws, msg);
                break;

            default:
                break;
        }
    });
});

app.listen(PORT, () => { console.log('Server started on port', PORT); });

function connectedHandler(ws, msg) {
    const id = msg.id;
    ws.id = id;
    if (!sessions[id]) sessions[id] = { dimensions: { ...msg.dimensions } };
    broadcastConnection(ws, msg);
}

function broadcastConnection(ws, msg) {
    const id = msg.id;

    for (const client of aWss.clients) {
        if (client.id === id) {
            if (msg.method === 'connected') msg.dimensions = { ...sessions[id].dimensions };
            client.send(JSON.stringify(msg));
        }
    }
}