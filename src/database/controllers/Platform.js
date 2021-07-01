import PlatformModel from '../models/Platform'
import { generateID } from '../datastore'
import { getGamePlatformCountP } from './Game'

// Create new system platform.
export async function createPlatform(req) {
    // Create platform model.
    const Platform = PlatformModel.create({
        _id: generateID(),
        name: req.name
    })
    // Save model to database.
    return await Platform.save()
}

// Search for a specific platform.
export async function getPlatform(req) {
    return await PlatformModel.findOne({ _id: req })
}

// Search for all platforms.
export async function getPlatforms() {
    return await PlatformModel.find()
        .then(async res => {
            // Loop through all the items in 'res'.
            for (let platform of res) {
                // Get and add titles count to the object.
                await getGamePlatformCountP(platform._id)
                    .then(count => {
                        platform.titles = count
                    })
            }
            // Return object.
            return res
        })
}