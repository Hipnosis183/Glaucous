import DeveloperModel from '../models/Developer'

// Create new game developer.
export async function createDeveloper (req) {
    // Create developer model.
    const Developer = DeveloperModel.create({
        name: req.name
    })
    // Save model to database.
    await Developer.save()
}

// Search for a specific developer.
export async function getDeveloper (req) {
    return await DeveloperModel.findOne({ _id: req })
}

// Search for all developers.
export async function getDevelopers () {
    return await DeveloperModel.find()
}