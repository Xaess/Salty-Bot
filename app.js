const properties = require("./properties.json");
const crontab = require("./crontab.json");
const Discord = require("discord.js");
var Cron = require("node-cron");

const StandardMessageConsumer = require("./consumers/standardMessageConsumer");
const CommandMessageConsumer = require("./consumers/commandMessageConsumer");

const bot = new Discord.Client();
const standardMessageConsumer = new StandardMessageConsumer.StandardMessageConsumer(
  require(properties.dictionary.location)
);
const commandMessageConsumer = new CommandMessageConsumer.CommandMessageConsumer();

const discordAuthenticationToken = properties.bot_token;
const logsChannelId = properties.preconfigured_channels.logs;
const announcementChannelId =
  properties.preconfigured_channels.announcement_channel;

bot.on("message", (message) => {
  if (message.author.bot) return;
  if (message.content.startsWith(properties.command_prefix)) {
    commandMessageConsumer.replyToMessage(message);
    return;
  }
  standardMessageConsumer.replyToMessage(message);
});

bot.on("ready", () => {
  try {
    let channel = bot.channels.cache.get(logsChannelId);
    channel.send(properties.preconfigured_messages.hello_world);
  } catch (error) {
    console.error(error);
  }

  for (let job of crontab.jobs) {
    if ("message" === job.type)
      Cron.schedule(job.cron, () => {
        let channel = bot.channels.cache.get(announcementChannelId);
        channel.send(job.value);
      });
    else console.error(`Jobs of type ${job.type} are not supported yet.`);
  }
});

bot.login(discordAuthenticationToken);
