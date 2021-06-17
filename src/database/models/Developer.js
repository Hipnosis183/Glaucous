const { Document } = require('marpat')

class DeveloperModel extends Document {
    constructor() {
        super()
        this.schema({
            name: { type: String, required: true }
        })
    }
    static collectionName() {
        return 'developers'
    }
}

module.exports = DeveloperModel