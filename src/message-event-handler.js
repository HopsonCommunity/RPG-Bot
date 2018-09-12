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
            this.handleCommand(msgInfo);
        }
    }

    handleCommand(msgInfo) {
        for (let handler of this.commandHandlers) {
            if (handler.isCommand(msgInfo.commandType)) {
                handler.handleCommand(msgInfo);
            }
        }
    }
}