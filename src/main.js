const Discord = require('discord.js');
const RPGBot  = require('./rpg-bot')
const Key     = require('./key');

const client = new Discord.Client();

new RPGBot(client).runBot();

client.login(Key.getToken());