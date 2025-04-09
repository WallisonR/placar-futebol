const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
let gameHalf = '1º Tempo'



const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Variáveis do cronômetro
let seconds = 0;
let timerInterval = null;

function formatTime(sec) {
  const min = Math.floor(sec / 60);
  const s = sec % 60;
  return `${String(min).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function startTimer() {
  if (!timerInterval) {
    timerInterval = setInterval(() => {
      seconds++;
      const formatted = formatTime(seconds);
      io.emit("match-time", formatted);
    }, 1000);
  }
}

function pauseTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

function resetTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  seconds = 0;
  io.emit("match-time", formatTime(seconds));
}

// SOCKET.IO
io.on("connection", (socket) => {
  console.log('🟢 Novo cliente conectado!');

  // Envia o tempo atual ao novo cliente
  socket.emit("match-time", formatTime(seconds));

  socket.on("update-score", (data) => {
    io.emit("update-score", data);
  });

  socket.on("start-timer", () => {
    startTimer();
  });

  socket.on("pause-timer", () => {
    pauseTimer();
  });

  socket.on("reset-timer", () => {
    resetTimer();
  });

  // Envia tempo atual ao conectar
socket.emit("set-half", gameHalf)

socket.on("set-half", (half) => {
  gameHalf = half
  io.emit("set-half", half)
  })


  socket.on("disconnect", () => {
    console.log("🔴 Cliente desconectado");
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`🚀 Servidor Socket.IO rodando em http://localhost:${PORT}`);
});
