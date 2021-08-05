const { Document } = require('marpat')
const GameRegionModel = require('./GameRegion')
const DeveloperModel = require('./Developer')
const PlatformModel = require('./Platform')

class GamePlatformModel extends Document {
    constructor() {
        super()
        this.schema({
            gamePlatforms: { type: [ GamePlatformModel ], required: true },
            gameRegions: { type: [ GameRegionModel ], required: true },
            developer: { type: DeveloperModel, required: true },
            platform: { type: PlatformModel, required: true },
            defaultTitle: { type: String, required: true },
            releaseYear: { type: String, required: true },
            numberPlayers: { type: String },
            latestVersion: { type: String }
        })
    }
    static collectionName() {
        return 'gamesPlatform'
    }
}

module.exports = GamePlatformModel