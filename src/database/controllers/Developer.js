import DeveloperModel from '../models/Developer'
import { generateID, connectDatastore } from '../datastore'
import { getGamePlatformCountD, deleteGamesD } from './Game'

// Create new game developer.
export async function createDeveloper(req) {
    // Create developer model.
    const Developer = DeveloperModel.create({
        _id: generateID(),
        name: req.name
    })
    // Save model to database.
    return await Developer.save()
}

// Search for a specific developer.
export async function getDeveloper(req) {
    return await DeveloperModel.findOne({ _id: req })
}

// Search for all developers.
export async function getDevelopers() {
    return await DeveloperModel.find()
        .then(async res => {
            // Loop through all the items in 'res'.
            for (let developer of res) {
                // Get and add titles count to the object.
                await getGamePlatformCountD(developer._id)
                    .then(count => {
                        developer.titles = count
                    })
            }
            // Return object.
            return res
        })
}

// Delete a specific developer.
export async function deleteDeveloper(req) {
    // Compact database.
    await connectDatastore().then(async () => {
        // Delete all of the developer's related games.
        await deleteGamesD(req)
        // Delete the developer itself.
        await DeveloperModel.findOneAndDelete({ _id: req })
    })
}