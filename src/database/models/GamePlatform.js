const { Document } = require('marpat')
const DeveloperModel = require('./Developer')
const PlatformModel = require('./Platform')

class GamePlatformModel extends Document {
    constructor() {
        super()
        this.schema({
            otherPlatforms: [{ type: GamePlatformModel }],
            developer: { type: DeveloperModel, required: true },
            platform: { type: PlatformModel, required: true },
            releaseYear: { type: String, required: true },
            numberPlayers: { type: String, required: true },
            latestVersion: { type: String }
        })
    }
    static collectionName() {
        return 'gamesPlatform'
    }
}

module.exports = GamePlatformModel