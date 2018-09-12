const Discord = require('discord.js');

module.exports = class CommandHandlerBase {
    constructor(commandID) {
        this.commandID = commandID;
        this.simpleCommands = new Map(); //String and string
    }

    isCommand(id) {
        return id === this.commandID;
    }

    handleCommand(msgInfo) {
        if (this.simpleCommands.has(msgInfo.command)) {
            msgInfo.channel.send(this.simpleCommands.get(msgInfo.command));
        }
    }

    addCommand(commandName, response) {
        this.simpleCommands.set(commandName, response);
    }
}