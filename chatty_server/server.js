// server.js

const express = require('express');
const WebSocket = require('ws');
const uuidv4 = require('uuid/v4');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new WebSocket.Server({ server });



wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');

  let usersOnline = wss.clients.size;
  console.log("number of connection", wss.clients.size)
  ws.send(JSON.stringify(usersOnline))

  ws.on('message', function incoming (message) {
    let receivedMessage = JSON.parse(message);

    switch(receivedMessage.type) {
      case "postMessage":
        receivedMessage.type = "incomingMessage"
        break;
      case "postNotification":
        receivedMessage.type = "incomingNotification"
        break;
      default:
        // show an error in the console if the message type is unknown
        throw new Error("Unknown event type " + receivedMessage.type);
    }
    receivedMessage.id = uuidv4();
    const sendMessage = JSON.stringify(receivedMessage);
    wss.broadcast(sendMessage);
  })

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});



