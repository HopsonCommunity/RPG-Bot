const Discord = require('discord.js');
const CommandHandlerBase = require('../command-handler-base');

module.exports = class RPGCommandHandler extends CommandHandlerBase {
    constructor() {
        super('rpg');
        this.setUpCommands();
    }

    setUpCommands() {
        super.addCommand("kill", "this command means you kill things or something");
    }
}