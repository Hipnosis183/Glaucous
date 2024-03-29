const { Document } = require('marpat')
const GameVersionModel = require('./GameVersion')

class GameRegionModel extends Document {
    constructor() {
        super()
        this.schema({
            gameVersions: { type: [GameVersionModel], required: true },
            title: { type: String, required: true },
            preTitle: { type: String },
            subTitle: { type: String },
            originalTitle: { type: String },
            romanizedTitle: { type: String },
            translatedTitle: { type: String },
            region: { type: String },
            serial: { type: String },
            notes: { type: [String] }
        })
    }
    static collectionName() {
        return 'gamesRegion'
    }
}

module.exports = GameRegionModel