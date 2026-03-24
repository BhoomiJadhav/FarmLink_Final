let ioInstance = null;

function initSocket(io) {
  ioInstance = io;
}

function emitToUser(userId, event, payload) {
  if (!ioInstance) {
    console.warn("⚠️ Socket not initialized");
    return;
  }

  console.log("📡 EMITTING SOCKET EVENT", {
    room: `user:${userId}`,
    event,
    payload,
  });

  ioInstance.to(`user:${userId}`).emit(event, payload);
}

function broadcast(event, payload) {
  if (!ioInstance) return;
  ioInstance.emit(event, payload);
}

module.exports = {
  initSocket,
  emitToUser,
  broadcast,
};
