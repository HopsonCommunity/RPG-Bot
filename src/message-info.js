module.exports = class MessageInfo {
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
        this.command = content[0];
        this.args    = content.slice(1);
        this.channel = message.channel;
        this.msg     = message;
    }
}