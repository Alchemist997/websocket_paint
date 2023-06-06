const express = require('express');
const app = express();
const WSServer = require('express-ws')(app);
const aWss = WSServer.getWss();
const PORT = process.env.PORT || 5000;

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
    ws.id = msg.id;
    broadcastConnection(ws, msg);
}

function broadcastConnection(ws, msg) {
    for (const client of aWss.clients) {
        if (client.id === msg.id) {
            client.send(JSON.stringify(msg));
        }
    }
}