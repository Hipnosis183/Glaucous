// Corner rounding options.
export const cornersRoundingOptions = [
    { i: 0, name: 'None', value: '0px' },
    { i: 1, name: 'Medium', value: '6px' },
    { i: 2, name: 'Large', value: '12px' },
    { i: 3, name: 'Extra Large', value: '18px' }
]

// Display mode options.
export const displayModeOptions = [
    { i: 0, name: 'Grid' },
    { i: 1, name: 'List' },
    { i: 2, name: 'Compact' }
]

// Card text display options.
export const cardTextDisplayOptions = [
    { i: 0, name: 'Selected' },
    { i: 1, name: 'Always' },
    { i: 2, name: 'Never' }
]

// Card text styling options.
export const cardTextStyleOptions = [
    { i: 0, name: 'Solid' },
    { i: 1, name: 'Transparent' },
    { i: 2, name: 'Gradient' },
    { i: 3, name: 'Blurred' }
]

// Images display options.
export const imagesDisplayOptions = [
    { i: 0, name: 'Default' },
    { i: 1, name: 'Cover' },
    { i: 2, name: 'Title' },
    { i: 3, name: 'In-Game' }
]

// Game list grouping modes.
export const gameCategoryOptions = [
    { i: 0, name: 'All Games' },
    { i: 1, name: 'Platforms' },
    { i: 2, name: 'Developers' }
]

// Set the border radius size on the game lists cards.
export const selectListCornersRounding = (cor) => {
    document.documentElement.style.setProperty('--rounded-list', cornersRoundingOptions[cor].value)
}

// Set the border radius size on the gallery images.
export const selectImageCornersRounding = (cor) => {
    document.documentElement.style.setProperty('--rounded-image', cornersRoundingOptions[cor].value)
}

// Set the amount of columns to be displayed on gallery images.
export const selectImageGridColumns = (col) => {
    document.documentElement.style.setProperty('--grid-cols-image', col)
}