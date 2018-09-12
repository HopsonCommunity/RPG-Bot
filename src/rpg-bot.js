const Discord = require('discord.js');
const MessageEventHandler = require('./message-event-handler');


/**
 * The main event handler for the bot
 */
module.exports = class RPGBot {
    /**
     * Construct the bot
     * @param {Discord.client} client The Discord client
     */
    constructor(client) {
        this.client  = client;
        this.messageEventHandler = new MessageEventHandler();
    }

    /**
     * Invoke the command handler
     */
    runBot() {
        this.client.on("ready", () => {
            console.log("RPG Bot has logged on.");
        });

        this.client.on('message', msg => {
            this.messageEventHandler.handle(msg);
        });
    }
}