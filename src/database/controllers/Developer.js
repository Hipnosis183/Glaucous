import DeveloperModel from '@/database/models/Developer'
import { generateID, connectDatastore } from '@/database/datastore'
import { getGamePlatformCountD, deleteGamesDeveloper } from './Game'

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

// Update a specific developer.
export async function updateDeveloper(req, id) {
    await DeveloperModel.findOneAndUpdate({ _id: id }, { name: req.name })
}

// Delete a specific developer.
export async function deleteDeveloper(req) {
    // Compact database.
    await connectDatastore().then(async () => {
        // Delete all of the developer's related games.
        await deleteGamesDeveloper(req)
        // Delete the developer itself.
        await DeveloperModel.findOneAndDelete({ _id: req })
    })
}

// Search for a specific developer.
export async function getDeveloper(req) {
    return await DeveloperModel.findOne({ _id: req })
}

// Search for all developers in the database matching the given name.
export async function getDeveloperByName(query) {
    const search = new RegExp(query, 'i')
    // Search through developers, case insensitive.
    return await DeveloperModel.find({ name: search })
}

// Search for all developers.
export async function getDevelopers(index, count) {
    return await DeveloperModel.find({}, { skip: index, limit: count, sort: 'name' })
        .then(async (res) => {
            return await getDeveloperCount(res)
        })
}

// Get title/platform count for each platform/group given.
async function getDeveloperCount(req) {
    for (let developer of req) {
        // Get and add titles count to the object.
        await getGamePlatformCountD(developer._id)
            .then((count) => { developer.titles = count })
    }
    // Return object.
    return req
}

// Get all developers matching a given search query.
export async function getDevelopersAllSearch(index, count, query) {
    const search = new RegExp(query, 'i')
    // Search through developers, case insensitive.
    return await DeveloperModel.find({ name: search }, { skip: index, limit: count, sort: 'name' })
        .then(async (res) => {
            return await getDeveloperCount(res)
        })
}