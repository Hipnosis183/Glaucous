import UserModel from '@/database/models/User'
import { generateID } from '@/database/datastore'
import { deleteGamesTag } from './Game'

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
            playlists: [],
            tags: []
        })
        // Save model to database.
        await User.save()
    }
}

// Remove a specific game from all user lists.
export async function removeGameUser(req) {
    // Remove the game from favorites.
    await removeFavorites(req._id)
    // Remove the game from recently played.
    await removeRecent(req._id)
    // Remove the game from all playlists.
    await removePlaylistAll(req._id)
}

// Sorting function for user objects.
const sortUserList = (a, b) => {
    // Compare function that returns natural ordered elements.
    return a.name.localeCompare(b.name, navigator.language, { numeric: true, ignorePunctuation: true })
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
    await ensureUser()
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
            return res ? res.favorites.includes(req) : false
        })
}

// Get all favorites.
export async function getFavorites(index, count) {
    return await UserModel.findOne({ _id: userId }, { skip: index, limit: count, select: ['favorites'], populate: false })
        .then((res) => {
            return res.favorites
        })
}

// Add a game platform to recently played.
export async function addRecent(req) {
    // Get all recently played games list.
    await UserModel.findOne({ _id: userId }, { select: ['recent'], populate: false })
        .then(async (res) => {
            // Remove game from list if already exists.
            res.recent = res.recent.filter((res) => res != req)
            // Add the selected game platform to the recently played list.
            res.recent.push(req)
            // Limit list items to 100, removing older entries if this limit is reached.
            if (res.recent.length > 100) {
                res.recent.shift()
            }
            // Update recently played list.
            await UserModel.findOneAndUpdate({ _id: userId }, { recent: res.recent })
        })
}

// Remove a game platform from recently played.
export async function removeRecent(req) {
    await ensureUser()
    // Get all recently played games list.
    await UserModel.findOne({ _id: userId }, { select: ['recent'], populate: false })
        .then(async (res) => {
            // Remove the selected game platform from the recently played list.
            res.recent = res.recent.filter((res) => res != req)
            // Update recently played list.
            await UserModel.findOneAndUpdate({ _id: userId }, { recent: res.recent })
        })
}

// Get all recently played games.
export async function getRecent(index, count) {
    await ensureUser()
    return await UserModel.findOne({ _id: userId }, { skip: index, limit: count, select: ['recent'], populate: false })
        .then((res) => {
            return res.recent.reverse()
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
    return await UserModel.findOne({ _id: userId }, { select: ['playlists'] })
        .then(async (res) => {
            // Add the created playlist.
            res.playlists.push(Playlist)
            // Update playlists.
            await UserModel.findOneAndUpdate({ _id: userId }, { playlists: res.playlists })
            // Return created playlist.
            return Playlist._id
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
            res.playlists = res.playlists.filter((res) => res._id != req)
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
    await ensureUser()
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

// Remove a game platform from all playlist.
export async function removePlaylistAll(req) {
    await ensureUser()
    // Get all playlists.
    await UserModel.findOne({ _id: userId }, { select: ['playlists'] })
        .then(async (res) => {
            // Search for playlists including the selected game.
            for (let [i, playlist] of res.playlists.entries()) {
                if (playlist.games.includes(req)) {
                    // Remove selected game from playlist.
                    res.playlists[i].games = playlist.games.filter((res) => res != req)
                }
            }
            // Update playlists.
            await UserModel.findOneAndUpdate({ _id: userId }, { playlists: res.playlists })
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
    await ensureUser()
    return await UserModel.findOne({ _id: userId }, { skip: index, limit: count, select: ['playlists'] })
        .then((res) => {
            return res.playlists.sort(sortUserList)
        })
}

// Get all playlists of a specific game.
export async function getGamePlaylists(req) {
    await ensureUser()
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
            return gamePlaylists.sort(sortUserList)
        })
}

// Get all playlists matching a given search query.
export async function getPlaylistsSearch(index, count, query) {
    await ensureUser()
    const search = new RegExp(query, 'i')
    // Get all playlists.
    return await UserModel.findOne({ _id: userId }, { skip: index, limit: count, select: ['playlists'] })
        .then((res) => {
            // Search playlists matching the query, case insensitive.
            return res.playlists.filter((res) => search.test(res.name)).sort(sortUserList)
        })
}

// Create new tag.
export async function createTag(req) {
    await ensureUser()
    // Create tag model.
    const Tag = {
        _id: generateID(),
        name: req
    }
    // Get all tags.
    return await UserModel.findOne({ _id: userId }, { select: ['tags'] })
        .then(async (res) => {
            // Add the created tag.
            res.tags.push(Tag)
            // Update tags.
            await UserModel.findOneAndUpdate({ _id: userId }, { tags: res.tags })
            // Return created tag.
            return Tag
        })
}

// Update a specific tag.
export async function updateTag(req, id) {
    // Get all tags.
    await UserModel.findOne({ _id: userId }, { select: ['tags'] })
        .then(async (res) => {
            // Get the selected tag.
            for (let [i, tag] of res.tags.entries()) {
                if (tag._id == id) {
                    // Update tag properties.
                    tag.name = req.name
                    res.tags[i] = tag
                    // Update tags.
                    await UserModel.findOneAndUpdate({ _id: userId }, { tags: res.tags })
                }
            }
        })
}

// Delete a specific tag.
export async function deleteTag(req) {
    // Delete tag from all of the games in which is included.
    await deleteGamesTag(req)
    // Get all tags.
    await UserModel.findOne({ _id: userId }, { select: ['tags'] })
        .then(async (res) => {
            // Remove selected tag object.
            res.tags = res.tags.filter((res) => res._id != req)
            // Update tags.
            await UserModel.findOneAndUpdate({ _id: userId }, { tags: res.tags })
        })
}

// Search for a specific tag.
export async function getTag(req) {
    // Get all tags.
    return await UserModel.findOne({ _id: userId }, { select: ['tags'] })
        .then((res) => {
            // Get the selected tag.
            for (let tag of res.tags) {
                if (tag._id == req) {
                    return tag
                }
            }
        })
}

// Get all or a specified group of tags.
export async function getTags(req) {
    await ensureUser()
    return await UserModel.findOne({ _id: userId }, { select: ['tags'] })
        .then((res) => {
            if (req) { res.tags = res.tags.filter((tag) => req.includes(tag._id)) }
            return res.tags.sort(sortUserList)
        })
}

// Get all tags matching a given search query.
export async function getTagsSearch(index, count, query) {
    await ensureUser()
    const search = new RegExp(query, 'i')
    // Get all tags.
    return await UserModel.findOne({ _id: userId }, { skip: index, limit: count, select: ['tags'] })
        .then((res) => {
            // Search tags matching the query, case insensitive.
            return res.tags.filter((res) => search.test(res.name)).sort(sortUserList)
        })
}