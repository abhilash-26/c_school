var Filter = require("bad-words");
filter = new Filter();

const {
  saveMessage,
  fetchMessage,
  sendPrevMessage,
} = require("../../controllers/chatController");

const chatModule = ({ io, socket }) => {
  let userdata = {};
  let userName = "abhilash";
  let communityType = "singing";
  const id = socket.id;
  console.log("connected");

  socket.on("join", async ({ userId, communityId }, useCallback) => {
    console.log("joined");
    userdata.userId = userId;
    userdata.communityId = communityId;
    const oldMessage = await fetchMessage(communityId);

    socket.emit("message", {
      user: "admin",
      text: ` welcome to the chat `,
    });
    socket.emit("message", {
      user: "admin",
      text: oldMessage ? sendPrevMessage(oldMessage) : "",
    });
    socket.join(userdata.communityId);

    // useCallback;
  });

  socket.on("sendMessage", async ({ message }) => {
    // emit message to the room assigned with communityId and clean message
    let cleanMessage = filter.clean(message);

    io.to(userdata.communityId).emit("message", {
      user: userdata.name,
      text: cleanMessage,
    });

    // saving message to db

    const result = await saveMessage({
      userId: userdata.userId,
      userName: userName,
      communityType: communityType,
      message,
      communityId: userdata.communityId,
    });
    console.log(result);
  });
};

module.exports = { chatModule };
