const socketio = require("socket.io");

const {
  addUserToRoom,
  getUsersInRoom,
  getUserBySocket,
  removeUserFromRoom,
} = require("./utils/users");
const addMessage = require("./utils/messages");

const createSocketServer = server => {
  const io = socketio(server);
  //*connection
  io.on("connection", socket => {
    socket.on("joinRoom", async data => {
      try {
        //add user to specified room (in mongo)
        const { username, room } = await addUserToRoom({
          socketId: socket.id,
          ...data,
        });

        socket.join(room);

        const messageToRoomMembers = {
          sender: "Admin",
          text: `${username} has joined the room!`,
          createdAt: new Date(),
        };

        // sending the message to all the users connected in the room
        socket.broadcast.to(room).emit("message", messageToRoomMembers);

        //*send rom info (users list) to all users
        const roomMembers = await getUsersInRoom(room);

        io.to(room).emit("roomData", { room, users: roomMembers });
      } catch (error) {
        console.log(error);
      }
    }); //* End joining chat room

    socket.on("sendMessage", async ({ room, message }) => {
      //*When a client send a message
      // search in the room for that user (search by socket.id)
      const user = await getUserBySocket(room, socket.id);

      const messageContent = {
        text: message,
        sender: user.username,
        room,
      };

      // save message in db
      await addMessage(messageContent.sender, room, messageContent.text);

      // send the message to all the people in that room
      io.to(room).emit("message", messageContent);
    });

    socket.on("leaveRoom", async ({ room }) => {
      //when a client leaves chat room

      try {
        // Remove socketid from room in db
        const username = await removeUserFromRoom(socket.id, room);

        const messageToRoomMembers = {
          sender: "Admin",
          text: `${username} has left`,
          createdAt: new Date(),
        };

        io.to(room).emit("message", messageToRoomMembers);

        // send rooms info (users list) to all users
        const roomMembers = await getUsersInRoom(room);
        io.to(room).emit("roomData", { room, users: roomMembers });
      } catch (error) {
        console.log(errer);
      }
    });
  });
};

module.exports = createSocketServer;
