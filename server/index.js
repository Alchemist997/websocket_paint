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

    ws.on('close', () => {
        const id = ws.id;
        const username = ws.username;
        sessions[id]?.users?.delete(username);
        broadcastConnection(ws, {
            id,
            username,
            method: 'disconnected',
            users: [...(sessions[id]?.users ?? [])],
        });
    })
});

app.listen(PORT, () => { console.log('Server started on port', PORT); });

function connectedHandler(ws, msg) {
    const id = msg.id;
    const username = msg.username;
    ws.id = id;
    ws.username = username;
    if (!sessions[id]) {
        sessions[id] = {
            dimensions: { ...msg.dimensions },
            users: new Set([username])
        };
    }
    sessions[id]?.users?.add(username);
    broadcastConnection(ws, msg);
}

function broadcastConnection(ws, msg) {
    const id = msg.id;

    for (const client of aWss.clients) {
        if (client.id !== id) continue

        if (msg.method === 'connected') {
            msg.dimensions = { ...sessions[id].dimensions };
            msg.users = [...(sessions[id]?.users ?? [])];
            msg.picture = sessions[id].picture;
        }

        if (msg.method === 'draw') {
            sessions[id].picture = msg.picture;
        }

        client.send(JSON.stringify(msg));
    }
}