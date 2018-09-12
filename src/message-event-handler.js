const Discord = require('discord.js');
const MessageInfo = require('./message-info')
const RPGCommandHandler = require('./rpg/rpg-commands');

module.exports = class MessageEventHandler {
    constructor () {
        this.commandHandlers = [
            new RPGCommandHandler()
        ]
    }

    handle (message) {
        const msgInfo = new MessageInfo(message);
        if (msgInfo.isCommand) {
            msgInfo.channel.send(`Command Type: ${msgInfo.commandType}\nCommand: ${msgInfo.command}\nArgs: ${msgInfo.args.join(", ")}`);
            this.handleCommand(msgInfo);
        }
    }

    handleCommand(msgInfo) {
        for (let handler of this.commandHandlers) {
            if (handler.isCommand(msgInfo.commandType)) {
                console.log("This is a command!");
                handler.handleCommand(msgInfo);
            }
        }
    }
}