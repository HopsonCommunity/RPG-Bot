const Discord = require('discord.js');
const CommandHandlerBase = require('../command-handler-base');

module.exports = class RPGCommandHandler extends CommandHandlerBase {
    constructor() {
        super('rpg');
        this.setUpCommands();
    }

    setUpCommands() {
        super.addBasicCommand("kill", "try to kill something", "test test");
    }
}