import PlatformModel from '../models/Platform'

// Create new system platform.
export async function createPlatform (req) {
    // Create platform model.
    const Platform = PlatformModel.create({
        name: req.name
    })
    // Save model to database.
    await Platform.save()
}

// Search for a specific platform.
export async function getPlatform (req) {
    return await PlatformModel.findOne({ _id: req._id })
}

// Search for all platforms.
export async function getPlatforms () {
    return await PlatformModel.find()
}