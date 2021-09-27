import PlatformModel from '../models/Platform'
import { generateID, connectDatastore } from '../datastore'
import { getGamePlatformCountP, deleteGamesP } from './Game'

// Create new system platform.
export async function createPlatform(req) {
    // Create platform model.
    const Platform = PlatformModel.create({
        _id: generateID(),
        group: req.group,
        name: req.name,
        parent: req.parent
    })
    // Save model to database.
    return await Platform.save()
}

// Update a specific system platform.
export async function updatePlatform(req, id) {
    // Configure the update values.
    const values = req.parent ? { $set: { parent: req.parent } } : { $unset: { parent: true } }
    // Update entry in database.
    await PlatformModel.findOneAndUpdate({ _id: id }, { name: req.name })
    await PlatformModel.findOneAndUpdate({ _id: id }, values, { manual: true })
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

// Get the count of platforms belonging to a specific group.
export async function getPlatformGroupCount(req) {
    return await PlatformModel.count({ parent: req })
}

// Search for a specific platform by name.
export async function getPlatformByName(query) {
    const search = new RegExp(query, 'i')
    // Search through platforms, case insensitive.
    return await PlatformModel.find({ name: search, group: false })
}

// Search for a specific platform by name.
export async function getPlatformAllByName(query) {
    const search = new RegExp(query, 'i')
    // Search through platforms, case insensitive.
    return await PlatformModel.find({ name: search })
}

// Search for a specific platform group by name.
export async function getPlatformGroupByName(query, id) {
    const search = new RegExp(query, 'i')
    // Search through platforms, case insensitive.
    return await PlatformModel.find({ group: true, name: search })
        .then(res => {
            if (id) {
                let platforms = []
                for (let platform of res) {
                    // Avoid returning the selected group itself.
                    if (platform._id != id) {
                        platforms.push(platform)
                    }
                } res = platforms
            }
            // Return search results.
            return res
        })
}

// Search for all platforms.
export async function getPlatforms(index, count) {
    // Exclude platforms that are part of a group (but not groups).
    return await PlatformModel.find({ parent: { $exists: false } }, { skip: index, limit: count, sort: 'name' })
        .then(async res => {
            return await getPlatformCount(res)
        })
}

// Search for all platforms from a specific group.
export async function getPlatformsGroup(req, index, count) {
    return await PlatformModel.find({ parent: req }, { skip: index, limit: count, sort: 'name' })
        .then(async res => {
            return await getPlatformCount(res)
        })
}

// Get title/platform count for each platform/group given.
async function getPlatformCount(req) {
    for (let platform of req) {
        if (platform.group) {
            // Get and add platforms count to the object.
            await getPlatformGroupCount(platform._id)
                .then(count => { platform.titles = count })
        } else {
            // Get and add titles count to the object.
            await getGamePlatformCountP(platform._id)
                .then(count => { platform.titles = count })
        }
    }
    // Return object.
    return req
}

// Get all platforms (and groups, recursively) matching a given search query.
export async function getPlatformsAllSearch(index, count, query) {
    const search = new RegExp(query, 'i')
    // Search through platforms, case insensitive.
    return await PlatformModel.find({ name: search }, { skip: index, limit: count, sort: 'name' })
        .then(async res => {
            return await getPlatformCount(res)
        })
}

// Get all platforms from a specific group matching a given search query.
export async function getPlatformsGroupAllSearch(index, count, req, query) {
    const search = new RegExp(query, 'i')
    // Search through platforms, case insensitive.
    return await PlatformModel.find({ parent: req, name: search }, { skip: index, limit: count, sort: 'name' })
        .then(async res => {
            return await getPlatformCount(res)
        })
}