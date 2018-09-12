const Discord = require('discord.js');
const MessageEventHandler = require('./message-event-handler');


module.exports = class RPGBot {
    constructor(client) {
        this.client  = client;
        this.messageEventHandler = new MessageEventHandler();
    }

    runBot() {
        this.client.on("ready", () => {
            console.log("RPG Bot has logged on.");
        });

        this.client.on('message', msg => {
            this.messageEventHandler.handle(msg);
        });
    }
}