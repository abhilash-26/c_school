const Chat = require("../models/chatModel");
var Filter = require("bad-words");
filter = new Filter();

const saveMessage = async ({
  userId,
  communityId,
  message,
  communityType,
  userName,
}) => {
  try {
    // Adding the time after which messages will be removed from db using ttl

    var timeToExpire = new Date();
    let getDate = timeToExpire.getDate();
    timeToExpire.setDate(getDate + 7);

    // Filter out the bad words from message and replace it with *
    let cleanMessage = filter.clean(message);

    if (
      (cleanMessage.trim() &&
        communityId &&
        userId &&
        communityType &&
        userName) == ""
    ) {
      return "field can't be empty";
    } else {
      const createdChatRoom = await Chat.create({
        userId: userId,
        userName: userName,
        communityId: communityId,
        communityType: communityType,
        message: cleanMessage,
        expire_at: timeToExpire,
      });
      return createdChatRoom;
    }
  } catch (error) {
    console.log(error);
  }
};

const fetchMessage = async (communityId) => {
  try {
    const prevMessage = await Chat.find({
      communityId: 123,
    });

    if (prevMessage) return prevMessage;
    return {};
  } catch (error) {
    console.log(error);
  }
};

const sendPrevMessage = (result) => {
  return result.map((item) => item.message);
};

module.exports = {
  saveMessage,
  fetchMessage,
  sendPrevMessage,
};
