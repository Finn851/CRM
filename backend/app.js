const express = require("express");
const bodyParser = require('body-parser');
const homeRoutes = require('./routes/homeRoutes');
const dashRoutes = require('./routes/dashRoutes');
const revenueRoutes = require('./routes/revenueRoutes');
const http = require('http');
const { Server } = require("socket.io");

const PORT = 3001;
const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

const server = http.createServer(app);
const io = new Server(server, {
  cors:{
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('message', (data) => {
    io.emit('message', data);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', homeRoutes);
app.use('/dashboard', dashRoutes);
app.use('/revenue', revenueRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

server.listen(4000, () => {
  console.log(`WebSocket server listening on port ${4000}`);
});
