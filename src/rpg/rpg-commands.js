const Discord = require('discord.js');
const CommandHandlerBase = require('../command-handler-base');

/**
 * The command hander for the RPG
 */
module.exports = class RPGCommandHandler extends CommandHandlerBase {
    /**
     * Create the RPGCommandHandler
     */
    constructor() {
        super('rpg');
        this.setUpCommands();
    }

    /**
     * On the tin
     */
    setUpCommands() {
        
    }
}