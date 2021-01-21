const properties = require("../properties.json");
exports.CommandMessageConsumer = class CommandMessageConsumer {
  /**
   * Tries to run the asked job
   *
   * @param {Object} message
   */
  replyToMessage(message) {
    try {
      const commandBody = message.content.slice(
        properties.command_prefix.length
      );
      const args = commandBody.split(" ");
      const command = args.shift().toLowerCase();

      const job = require(`../jobs/${command}.js`);
      job.run(message);
    } catch (error) {
      console.error(`Error catched: ${error}`);
      message.reply(properties.preconfigured_messages.unknown_command_message);
    }
  }
};
