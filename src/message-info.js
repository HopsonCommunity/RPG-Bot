module.exports = class MessageInfo {
    constructor (message) {
        this.isCommand = message.content[0] === '-';
        if (!this.isCommand) {
            return;
        }
        const content = message.content.slice(1).split(' ');
        this.command = content[0].toLowerCase();
        this.args    = content.slice(0);
        this.channel = message.channel;
        this.msg     = message;
    }
}