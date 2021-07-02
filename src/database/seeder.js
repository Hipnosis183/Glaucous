import { newGamePlatform } from './controllers/Game'
import { createPlatform } from './controllers/Platform'
import { createDeveloper } from './controllers/Developer'

export async function dbSeed() {
    const d = 'Developer'
    const p = 'Platform'
    const g = 'Game'
    // Set amount of platforms to create.
    for (let i = 0; i < 10; i++) {
        // Set platform name.
        await platformSeed(p)
            .then(async pla => {
                // Set platform name.
                await developerSeed(d)
                    .then(async dev => {
                        // Set amount of games to create for each platform.
                        for (let i = 0; i < 100; i++) {
                            // Set game data. Needs an existing developer.
                            await gameSeed(
                                g, // Title
                                g, // Subtitle
                                g, // Original Title
                                g, // Romanized Title
                                g, // Translated Title
                                g, // Region
                                dev._id, // Developer
                                pla._id, // Platform
                                g, // Release Year
                                g, // Number of Players
                                g, // Latest Version
                                g, // Current Version
                                [g] // Comments
                            )
                        }
                    })
            })
    }
}

async function developerSeed(a) {
    let Developer = {
        name: a
    }
    return await createDeveloper(Developer)
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