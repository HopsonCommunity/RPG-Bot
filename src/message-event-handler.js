const Discord = require('discord.js');
const MessageInfo = require('./message-info')
const RPGCommandHandler = require('./rpg/rpg-commands');

/**
 * Class to handle messages sent by the user
 */
module.exports = class MessageEventHandler {
    /**
     * Creates the command handlers and constructs the handler
     */
    constructor () {
        this.commandHandlers = [
            new RPGCommandHandler()
        ]
    }
    /**
     * Entry point for handling messages
     * @param {Discord.TextMessage} message The raw message sent by a user
     */
    handle (message) {
        const msgInfo = new MessageInfo(message);
        if (msgInfo.sucess) {
            if (msgInfo.isCommand) {
                this.handleCommand(msgInfo);
            }
        }
    }

    /**
     * Handles a command message
     * @param {MessageInfo} msgInfo Info about message sent by user
     */
    handleCommand(msgInfo) {
        for (let handler of this.commandHandlers) {
            if (handler.isCommand(msgInfo.commandType)) {
                handler.handleCommand(msgInfo);
            }
        }
    }
}