const Discord = require('discord.js');

/**
 * A command
 */
class Command {
    /**
     * 
     * @param {String} desc Description of command
     * @param {String} ex Example useage of command
     * @param {String or function(MessageInfo)} action Command action
     */
    constructor (desc, ex, action) {
        this.description = desc;
        this.example = ex;
        this.action = action;
    }
}

/**
 * The base of all command handlers
 */
module.exports = class CommandHandlerBase {
    /**
     * 
     * @param {String} commandID String sent by user that will invoke this command handler
     */
    constructor(commandID) {
        this.commandID = commandID;
        this.simpleCommands = new Map(); //String and string
        this.commands       = new Map(); //String and Command
        this.addCommand("help", "", "", this.sendHelpList.bind(this));
    }

    /**
     * Returns true if this class is the command handler trying to be accessed
     * @param {String} id A string that is the first part of a message
     */
    isCommand(id) {
        return id === this.commandID;
    }

    /**
     * Handles a command
     * @param {MessageInfo} msgInfo Information about the message sent by the user
     */
    handleCommand(msgInfo) {
        if (this.simpleCommands.has(msgInfo.command)) {
            msgInfo.channel.send(this.simpleCommands.get(msgInfo.command).action);
        }
        else if (this.commands.has(msgInfo.command)) {
            let cmd = this.commands.get(msgInfo.command);
            cmd.action(msgInfo);
        }
    }

    /**
     * Add a command which has the response of an simple message
     * @param {String} commandName The ID/ name of the command that will invoke this
     * @param {String} description Description of what the command does
     * @param {String} example Example useage of the command
     * @param {String} action The string that is sent by the bot in response
     */
    addBasicCommand(commandName, description, action) {
        let example = `-${this.commandID} ${commandName}`;
        this.simpleCommands.set(commandName, new Command(description, example, action));
    }

    /**
     * Add a command which has the response of a function call
     * @param {String} commandName The ID/ name of the command that will invoke this
     * @param {String} description Description of what the command does
     * @param {String} example Example useage of the command
     * @param {function(messageInfo)} action Function that is called in response the command. This must take in a single argument, the message info
     */
    addCommand(commandName, description, example, action) {
        let fullExample = `-${this.commandID} ${example}`;
        this.commands.set(commandName, new Command(description, example, action));
    }

    /**
     * [Command] Sends help list
     * @param {MessageInfo} msgInfo Information about the message
     */
    sendHelpList(msgInfo) {
        let output = new Discord.RichEmbed()
            .setTitle("Commands for " + this.commandID.toUpperCase())
            .setColor("#09f228");

        function addOutput(m) {
            m.forEach(function(command, commandName, _) {
                if (commandName === "help") return;
                output.addField(`**__${commandName}__**`, 
                                `Description: ${command.description}\nExample: *${command.example}*`);
            });
        }
        addOutput(this.simpleCommands);
        addOutput(this.commands);
        msgInfo.channel.send(output);
    }
}