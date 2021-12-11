const { Document } = require('marpat')
const GameRegionModel = require('./GameRegion')
const DeveloperModel = require('./Developer')
const PlatformModel = require('./Platform')

class GamePlatformModel extends Document {
    constructor() {
        super()
        this.schema({
            gamePlatforms: { type: [GamePlatformModel], required: true },
            gameRegions: { type: [GameRegionModel], required: true },
            platform: { type: PlatformModel, required: true },
            developers: { type: [DeveloperModel] },
            releaseYear: { type: String },
            numberPlayers: { type: String },
            gameTags: { type: [String] },
            notes: { type: [String] }
        })
    }
    static collectionName() {
        return 'gamesPlatform'
    }
}

module.exports = GamePlatformModel