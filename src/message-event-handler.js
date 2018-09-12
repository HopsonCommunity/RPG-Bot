const Discord = require('discord.js');
const MessageInfo = require('./message-info')

module.exports = class MessageEventHandler {
    constructor () {

    }

    handle (message) {
        const msgInfo = new MessageInfo(message);
        if (msgInfo.isCommand) {

        }
    }
}