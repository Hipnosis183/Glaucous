import UserModel from '../models/User'

// Set user data.
const userId = '00000000'
const userName = 'Viridian'

// Ensure the user object exists.
async function ensureUser() {
  if (!await UserModel.count({ _id: userId })) {
    // Create default user model.
    const User = UserModel.create({
      _id: userId,
      name: userName,
      recent: [],
      favorites: [],
      playlists: []
    })
    // Save model to database.
    return await User.save()
  }
}

// Get the favorite state of a specific game.
export async function getFavorite(req) {
  return await UserModel.findOne({ _id: userId }, { populate: false })
    .then(async (res) => {
      return res.favorites.includes(req)
    })
}

// Get all favorites.
export async function getFavorites(index, count) {
  return await UserModel.findOne({ _id: userId }, { skip: index, limit: count, select: ['favorites'], populate: false })
    .then(async (res) => {
      return res.favorites
    })
}

// Add a game platform to favorites.
export async function addFavorites(req) {
  await ensureUser()
  // Get all favorites.
  let games = await UserModel.findOne({ _id: userId }, { select: ['favorites'], populate: false })
  // Add the selected game platform to the favorites list.
  games.favorites.push(req)
  // Update favorites list.
  await UserModel.findOneAndUpdate({ _id: userId }, { favorites: games.favorites })
}

// Remove a game platform from favorites.
export async function removeFavorites(req) {
  await ensureUser()
  // Get all favorites.
  let games = await UserModel.findOne({ _id: userId }, { select: ['favorites'], populate: false })
  // Remove the selected game platform from the favorites list.
  games.favorites = games.favorites.filter((res) => res != req)
  // Update favorites list.
  await UserModel.findOneAndUpdate({ _id: userId }, { favorites: games.favorites })
}