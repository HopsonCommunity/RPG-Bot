
/**
 * A "struct" to hold message information
 */
module.exports = class MessageInfo {
    /**
     * Construct message info struct
     * @param {Discord TextMessage} message Raw message sent by user
     */
    constructor (message) {
        this.isCommand = message.content[0] === '-';
        if (!this.isCommand) {
            return;
        }
        const content = message.content
                            .slice(1)
                            .split(' ')
                            .map((s) => {
                                return s.toLowerCase()
                            });;
        this.commandType    = content[0];
        this.command        = content[1];
        this.args           = content.slice(2);
        this.channel        = message.channel;
        this.msg            = message;
    }
}