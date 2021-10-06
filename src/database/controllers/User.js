import UserModel from '../models/User'
import { generateID } from '../datastore'

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
        await User.save()
    }
}

// Add a game platform to favorites.
export async function addFavorites(req) {
    await ensureUser()
    // Get all favorites.
    await UserModel.findOne({ _id: userId }, { select: ['favorites'], populate: false })
        .then(async (res) => {
            // Add the selected game platform to the favorites list.
            res.favorites.push(req)
            // Update favorites list.
            await UserModel.findOneAndUpdate({ _id: userId }, { favorites: res.favorites })
        })
}

// Remove a game platform from favorites.
export async function removeFavorites(req) {
    // Get all favorites.
    await UserModel.findOne({ _id: userId }, { select: ['favorites'], populate: false })
        .then(async (res) => {
            // Remove the selected game platform from the favorites list.
            res.favorites = res.favorites.filter((res) => res != req)
            // Update favorites list.
            await UserModel.findOneAndUpdate({ _id: userId }, { favorites: res.favorites })
        })
}

// Get the favorite state of a specific game.
export async function getFavorite(req) {
    return await UserModel.findOne({ _id: userId }, { populate: false })
        .then((res) => {
            return res.favorites.includes(req)
        })
}

// Get all favorites.
export async function getFavorites(index, count) {
    return await UserModel.findOne({ _id: userId }, { skip: index, limit: count, select: ['favorites'], populate: false })
        .then((res) => {
            return res.favorites
        })
}

// Create new playlist.
export async function createPlaylist(req) {
    await ensureUser()
    // Create playlist model.
    const Playlist = {
        _id: generateID(),
        name: req.name,
        games: []
    }
    // Get all playlists.
    await UserModel.findOne({ _id: userId }, { select: ['playlists'] })
        .then(async (res) => {
            // Add the created playlist.
            res.playlists.push(Playlist)
            // Update playlists.
            await UserModel.findOneAndUpdate({ _id: userId }, { playlists: res.playlists })
        })
}

// Update a specific playlist.
export async function updatePlaylist(req, id) {
    // Get all playlists.
    await UserModel.findOne({ _id: userId }, { select: ['playlists'] })
        .then(async (res) => {
            // Get the selected playlist.
            for (let [i, playlist] of res.playlists.entries()) {
                if (playlist._id == id) {
                    // Update playlist properties.
                    playlist.name = req.name
                    res.playlists[i] = playlist
                    // Update playlists.
                    await UserModel.findOneAndUpdate({ _id: userId }, { playlists: res.playlists })
                }
            }
        })
}

// Delete a specific playlist.
export async function deletePlaylist(req) {
    // Get all playlists.
    await UserModel.findOne({ _id: userId }, { select: ['playlists'] })
        .then(async (res) => {
            // Remove selected playlist object.
            res.playlists = res.playlists.filter((pla) => pla._id != req)
            // Update playlists.
            await UserModel.findOneAndUpdate({ _id: userId }, { playlists: res.playlists })
        })
}

// Add a game platform to a specific playlist.
export async function addPlaylist(req, game) {
    // Get all playlists.
    await UserModel.findOne({ _id: userId }, { select: ['playlists'] })
        .then(async (res) => {
            // Get the selected playlist.
            for (let [i, playlist] of res.playlists.entries()) {
                if (playlist._id == req) {
                    // Add selected game to playlist.
                    playlist.games.push(game)
                    res.playlists[i] = playlist
                    // Update playlists.
                    await UserModel.findOneAndUpdate({ _id: userId }, { playlists: res.playlists })
                }
            }
        })
}

// Remove a game platform from specific playlist.
export async function removePlaylist(req, game) {
    // Get all playlists.
    await UserModel.findOne({ _id: userId }, { select: ['playlists'] })
        .then(async (res) => {
            // Get the selected playlist.
            for (let [i, playlist] of res.playlists.entries()) {
                if (playlist._id == req) {
                    // Remove selected game from playlist.
                    playlist.games = playlist.games.filter((res) => res != game)
                    res.playlists[i] = playlist
                    // Update playlists.
                    await UserModel.findOneAndUpdate({ _id: userId }, { playlists: res.playlists })
                }
            }
        })
}

// Search for a specific playlist.
export async function getPlaylist(req) {
    // Get all playlists.
    return await UserModel.findOne({ _id: userId }, { select: ['playlists'] })
        .then((res) => {
            // Get the selected playlist.
            for (let playlist of res.playlists) {
                if (playlist._id == req) {
                    return playlist
                }
            }
        })
}

// Get all playlists.
export async function getPlaylists(index, count) {
    return await UserModel.findOne({ _id: userId }, { skip: index, limit: count, select: ['playlists'] })
        .then((res) => {
            return res.playlists
        })
}

// Get all playlists of a specific game.
export async function getGamePlaylists(req) {
    // Get all playlists.
    return await UserModel.findOne({ _id: userId }, { select: ['playlists'] })
        .then((res) => {
            let gamePlaylists = []
            // Search for playlists including the selected game.
            for (let playlist of res.playlists) {
                if (playlist.games.includes(req)) {
                    gamePlaylists.push(playlist)
                }
            }
            // Return playlists.
            return gamePlaylists
        })
}

// Get all playlists matching a given search query.
export async function getPlaylistsSearch(index, count, query) {
    const search = new RegExp(query, 'i')
    // Get all playlists.
    return await UserModel.findOne({ _id: userId }, { skip: index, limit: count, select: ['playlists'] })
        .then((res) => {
            // Search playlists matching the query, case insensitive.
            return res.playlists.filter((res) => search.test(res.name))
        })
}