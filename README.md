# Salty Bot

This is juste a simple bot I made for fun after checking old projects I worked on when I was a student.
It detects keywords in a message, and choose a random reply from a suuported keyword defined in a dictionary file. Of course, to avoid spam, it can be configured to have a % of chances to reply.

It also support commands, you just need to add a .js file in the `jobs` folder.

## Set up

To run the bot, you just need NodeJS and access to internet. Just run `npm install` then `npm start` to start the bot.

## Features

- Reply to messages: this one is simple, it reads the messages it can access and chose (or not) a reply.
- Execute commands: you can add js scripts to the jobs folder, then you can call them using the file name with the defined prefix.
- Send regular messages: you can set up messages that will be sent regulary.

## Config files

Check `properties.sample.json`, `crontab.sample.json` and `dictionary.sample.json` to see the available configs.
