exports.run = (message) => {
  const timeTaken = Date.now() - message.createdTimestamp;
  message.reply(`Pong! ${timeTaken}`);
};
