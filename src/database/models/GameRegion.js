const { Document } = require('marpat')
const GamePlatformModel = require('./GamePlatform')

let dbname = '.gamesRegion'

class GameRegionModel extends Document {
    constructor() {
        super()
        this.schema({
            gamePlatform: { type: GamePlatformModel, required: true },
            title: { type: String, required: true },
            subTitle: { type: String, required: true },
            originalTitle: { type: String },
            romanizedTitle: { type: String },
            translatedTitle: { type: String },
            region: { type: String, required: true }
        })
    }
    preInit(data) {
        dbname = data.platform + dbname
    }
    static fullTitle() {
        return this.title + this.subTitle
    }
    static hasSymbols() {
        return this.originalTitle ? true : false;
    }
    static collectionName() {
        return dbname
    }
}

module.exports = GameRegionModel