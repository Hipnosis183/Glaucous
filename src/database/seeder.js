import { newGamePlatform } from './controllers/Game'
import { createPlatform } from './controllers/Platform'

export async function dbSeed() {
    // Set amount of platforms to create.
    for (let i = 0; i < 10; i++) {
        // Set platform name.
        await platformSeed('-')
            .then(async res => {
                // Set amount of games to create for each platform.
                for (let i = 0; i < 100; i++) {
                    // Set game data. Needs an existing developer.
                    await gameSeed(
                        '-', // Title
                        '-', // Subtitle
                        '-', // Original Title
                        '-', // Romanized Title
                        '-', // Translated Title
                        '-', // Region
                        '-', // Developer
                        res._id, // Platform
                        '-', // Release Year
                        '-', // Number of Players
                        '-', // Latest Version
                        '-', // Current Version
                        ['-'] // Comments
                    )
                }
            })
    }
}

async function platformSeed(a) {
    let Platform = {
        name: a
    }
    return await createPlatform(Platform)
}

async function gameSeed(a, b, c, d, e, f, g, h, i, j, k, l, m) {
    let gameForm = {
        gamePlatform: {
            developer: g,
            platform: h,
            releaseYear: i,
            numberPlayers: j,
            latestVersion: k
        },
        gameRegion: {
            title: a,
            subTitle: b,
            originalTitle: c,
            romanizedTitle: d,
            translatedTitle: e,
            region: f
        },
        gameVersion: {
            currentVersion: l,
            comments: m
        }
    }
    await newGamePlatform(gameForm)
}