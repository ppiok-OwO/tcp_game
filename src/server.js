import net from 'net';
import initServer from './init/index.js';

const PORT = 5555;

// 서버 객체 생성(socket() & bind())
const server = net.createServer((socket) => {
  console.log(
    `Client connected from: ${socket.remoteAddress}:${socket.remotePort}`,
  );

  socket.on('data', (data) => {
    console.log(data);
  });

  socket.on('end', () => {
    console.log(`Client disconnected`);
  });

  socket.on('error', (err) => {
    console.error(`Socket error: `, err);
  });
});

// 에셋 로드가 성공하면 소켓으로 listen()
initServer()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Echo server listening on port: ${PORT}`);
      console.log(server.address());
    });
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
