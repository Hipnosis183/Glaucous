const { Document } = require('marpat')

class GameVersionModel extends Document {
    constructor() {
        super()
        this.schema({
            name: { type: String },
            number: { type: String },
            latest: { type: String },
            comments: { type: [String] }
        })
    }
    static collectionName() {
        return 'gamesVersion'
    }
}

module.exports = GameVersionModel