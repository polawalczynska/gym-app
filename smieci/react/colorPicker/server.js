import express from "express";
import cors from 'cors';
import { WebSocketServer } from "ws";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

let gridData = Array(400).fill("#FFFFFF");

app.listen(PORT, (req, res) => {
    console.log(`server running on port ${PORT}`);
})

const wss = new WebSocketServer({ port: 3000 });

wss.on('connection', ws => {
    console.log('new client connected');
    ws.send(JSON.stringify({ event: 'initial', gridColors: gridData }));

    ws.on('message', (message) => {
        const data = JSON.parse(message);
        if (data.event === 'update') {
            gridData = data.gridColors;
            console.log('received update from client: ');
            wss.clients.forEach(client => {
                if (client.readyState === ws.OPEN) {
                    console.log('broadcasting update to client...');
                    client.send(JSON.stringify({ event: 'update', gridColors: gridData }));
                }
            });
        }
    });

    ws.on('close', () => {
        console.log('client disconnected');
    });

    ws.on('error', (err) => {
        console.error('ws error: ', err);
    });
})