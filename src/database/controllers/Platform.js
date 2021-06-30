import PlatformModel from '../models/Platform'

import { connectDatastore } from '../datastore'
import { getGamePlatformCount } from './Game'

// Create new system platform.
export async function createPlatform(req) {
    // Create platform model.
    const Platform = PlatformModel.create({
        name: req.name
    })
    // Save model to database.
    await Platform.save()
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
                await connectDatastore(platform._id).then(async () => {
                    // Get and add titles count to the object.
                    await getGamePlatformCount()
                        .then(count => {
                            platform.titles = count
                        })
                })
            }
            // Return object.
            return res
        })
}