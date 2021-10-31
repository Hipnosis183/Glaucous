const { Document } = require('marpat')

class GameVersionModel extends Document {
    constructor() {
        super()
        this.schema({
            type: { type: String },
            name: { type: String },
            number: { type: String },
            comments: { type: [String] }
        })
    }
    static collectionName() {
        return 'gamesVersion'
    }
}

module.exports = GameVersionModel