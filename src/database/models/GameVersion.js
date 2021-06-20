const { Document } = require('marpat')
const GameRegionModel = require('./GameRegion')

let dbname = '.gamesVersion'

class GameVersionModel extends Document {
    constructor() {
        super()
        this.schema({
            gameRegion: { type: GameRegionModel, required: true },
            currentVersion: { type: String },
            comments: { type: String }
        })
    }
    preInit(data) {
        dbname = data.platform + dbname
    }
    static collectionName() {
        return dbname
    }
}

module.exports = GameVersionModel