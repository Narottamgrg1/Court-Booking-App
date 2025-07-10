import WebSocket, { WebSocketServer } from 'ws';

/**
 * Sets up WebSocket server on existing HTTP server.
 * @param {http.Server} server - Node HTTP server instance
 */
export function setupWebSocket(server) {
  // Create WebSocket server on top of existing HTTP server
  const wss = new WebSocketServer({ server });

  wss.on('connection', (ws, req) => {
    console.log('New WebSocket connection');

    // Example: send welcome message on new connection
    ws.send(JSON.stringify({ message: 'Welcome to WebSocket server!' }));

    // Listen for messages from client
    ws.on('message', (data) => {
      console.log('Received:', data.toString());

      // Echo message back to client
      ws.send(`Server received: ${data.toString()}`);
    });

    // Handle connection close
    ws.on('close', () => {
      console.log('WebSocket connection closed');
    });

    // Handle errors
    ws.on('error', (err) => {
      console.error('WebSocket error:', err);
    });
  });

  console.log('WebSocket server setup complete');
}
