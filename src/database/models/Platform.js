const { Document } = require('marpat')

class PlatformModel extends Document {
    constructor() {
        super()
        this.schema({
            name: { type: String, required: true }
        })
    }
    static collectionName() {
        return 'platforms'
    }
}

module.exports = PlatformModel