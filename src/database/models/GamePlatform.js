const { Document } = require('marpat')
const DeveloperModel = require('./Developer')
const PlatformModel = require('./Platform')

let dbname = '.gamesPlatform'

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
    preInit(data) {
        dbname = data.platform + dbname
    }
    static collectionName() {
        return dbname
    }
}

module.exports = GamePlatformModel