const { Document } = require('marpat')
const GamePlatformModel = require('./GameRegion')

class UserModel extends Document {
    constructor() {
        super()
        this.schema({
            name: { type: String, required: true },
            favorites: { type: [GamePlatformModel] },
            recent: { type: [GamePlatformModel] },
            playlists: { type: [Object] },
            tags: { type: [Object] }
        })
    }
    static collectionName() {
        return 'users'
    }
}

module.exports = UserModel