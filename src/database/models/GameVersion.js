const { Document } = require('marpat')

class GameVersionModel extends Document {
    constructor() {
        super()
        this.schema({
            currentVersion: { type: String },
            comments: { type: String }
        })
    }
    static collectionName() {
        return 'gamesVersion'
    }
}

module.exports = GameVersionModel