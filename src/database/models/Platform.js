const { Document } = require('marpat')

class PlatformModel extends Document {
    constructor() {
        super()
        this.schema({
            group: { type: Boolean },
            name: { type: String, required: true },
            parent: { type: PlatformModel }
        })
    }
    static collectionName() {
        return 'platforms'
    }
}

module.exports = PlatformModel