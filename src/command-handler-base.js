const Discord = require('discord.js');

class Command {
    constructor (desc, ex, action) {
        this.description = desc;
        this.example = ex;
        this.action = action;
        console.log(`Command added.\nDescription:${this.description}\nEx: ${this.example}\nAction: ${this.action}`);
    }
}

module.exports = class CommandHandlerBase {
    constructor(commandID) {
        this.commandID = commandID;
        this.simpleCommands = new Map(); //String and string
        this.commands       = new Map(); //String and Command
        this.addCommand("help", "", "", this.sendHelpList.bind(this));
    }

    isCommand(id) {
        return id === this.commandID;
    }

    handleCommand(msgInfo) {
        if (this.simpleCommands.has(msgInfo.command)) {
            msgInfo.channel.send(this.simpleCommands.get(msgInfo.command).action);
        }
        else if (this.commands.has(msgInfo.command)) {
            let cmd = this.commands.get(msgInfo.command);
            cmd.action(msgInfo);
        }
    }

    addBasicCommand(commandName, description, action) {
        let example = `-${this.commandID} ${commandName}`;
        this.simpleCommands.set(commandName, new Command(description, example, action));
    }

    addCommand(commandName, description, example, action) {
        let fullExample = `-${this.commandID} ${example}`;
        this.commands.set(commandName, new Command(description, example, action));
    }

    sendHelpList(msgInfo) {
        let output = new Discord.RichEmbed()
            .setTitle("Commands for " + this.commandID.toUpperCase())
            .setColor("#09f228");

        function addOutput(m) {
            m.forEach(function(command, commandName, _) {
                if (commandName === "help") return;
                output.addField(`**__${commandName}__**`, 
                                `Description: ${command.description}\nExample: *>${command.example}*`);
            });
        }
        addOutput(this.simpleCommands);
        addOutput(this.commands);
        msgInfo.channel.send(output);
    }
}