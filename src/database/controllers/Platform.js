import PlatformModel from '../models/Platform'
import { generateID, connectDatastore } from '../datastore'
import { getGamePlatformCountP, deleteGamesP } from './Game'

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

// Update a specific system platform.
export async function updatePlatform(req, id) {
    await PlatformModel.findOneAndUpdate({ _id: id }, { name: req.name })
}

// Delete a specific system platform.
export async function deletePlatform(req) {
    // Compact database.
    await connectDatastore().then(async () => {
        // Delete all of the platform's related games.
        await deleteGamesP(req)
        // Delete the platform itself.
        await PlatformModel.findOneAndDelete({ _id: req })
    })
}

// Search for a specific platform.
export async function getPlatform(req) {
    return await PlatformModel.findOne({ _id: req })
}

// Search for a specific platform.
export async function getPlatformByName(q) {
    let query = new RegExp(q, 'i')
    // Search through platforms, case insensitive.
    return await PlatformModel.find({ name: query })
}

// Search for all platforms.
export async function getPlatforms(index, count) {
    return await PlatformModel.find({}, { skip: index, limit: count, sort: 'name' })
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