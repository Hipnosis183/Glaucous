const { Document } = require('marpat')
const GameRegionModel = require('./GameRegion')

class GameVersionModel extends Document {
    constructor() {
        super()
        this.schema({
            gameRegion: { type: GameRegionModel, required: true },
            currentVersion: { type: String },
            comments: { type: String }
        })
    }
    static collectionName() {
        return 'gamesVersion'
    }
}

module.exports = GameVersionModel