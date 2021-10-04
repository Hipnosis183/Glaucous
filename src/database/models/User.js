const { Document } = require('marpat')
const GamePlatformModel = require('./GameRegion')

class UserModel extends Document {
    constructor() {
        super()
        this.schema({
            name: { type: String, required: true },
            favorites: { type: [GamePlatformModel] },
            recent: { type: [GamePlatformModel] },
            playlists: { type: [Playlist] }
        })
    }
    static collectionName() {
        return 'users'
    }
}

class Playlist extends Document {
    constructor() {
        super()
        this.schema({
            name: { type: String, required: true },
            games: { type: [GamePlatformModel] }
        })
    }
}

module.exports = UserModel