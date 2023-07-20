class LineError {
    constructor(message, value, line) {
        this.message = message,
        this.value = value
        this.line = line
    }
}

module.exports = LineError