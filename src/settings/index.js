// Card image positions list.
export const listImagesOptions = [
    { i: 0, name: 'Default' },
    { i: 1, name: 'Cover' },
    { i: 2, name: 'Title' },
    { i: 3, name: 'In-Game' }
]

// Card image positions list.
export const listTextShowOptions = [
    { i: 0, name: 'Selected' },
    { i: 1, name: 'Always' },
    { i: 2, name: 'Never' }
]

// Card image positions list.
export const listTextStyleOptions = [
    { i: 0, name: 'Solid' },
    { i: 1, name: 'Transparent' },
    { i: 2, name: 'Gradient' },
    { i: 3, name: 'Blurred' }
]

// Card view modes list.
export const listDisplayOptions = [
    { i: 0, name: 'Grid' },
    { i: 1, name: 'List' },
    { i: 2, name: 'Compact' }
]

// Game list grouping modes.
export const gameCategoryOptions = [
    { i: 0, name: 'All Games' },
    { i: 1, name: 'Platforms' },
    { i: 2, name: 'Developers' }
]

// Images corner rounding modes.
export const cornersOptions = [
    { i: 0, name: 'None', value: '0px' },
    { i: 1, name: 'Medium', value: '6px' },
    { i: 2, name: 'Large', value: '12px' },
    { i: 3, name: 'Extra Large', value: '18px' }
]

// Google search key parameters.
export const googleKeys = [
    { i: 0, name: 'Full Title' },
    { i: 1, name: 'Original Title' },
    { i: 2, name: 'Developer' }
]

// Background image selection.
export const imageBackgroundOptions = [
    { i: 0, name: 'Default' },
    { i: 1, name: 'Background' },
    { i: 2, name: 'Cover' },
    { i: 3, name: 'Title' },
    { i: 4, name: 'In-Game' }
]

// Background image positioning.
export const placeBackgroundOptions = [
    { i: 0, name: 'Default' },
    { i: 1, name: 'Top' },
    { i: 2, name: 'Bottom' },
    { i: 3, name: 'Left' },
    { i: 4, name: 'Right' }
]

// Set the amount of columns to be displayed on gallery images.
export const selectImageColumns = (col) => {
    document.documentElement.style.setProperty('--grid-cols-image', col)
}

// Set the border radius size on the game lists cards.
export const selectCardCorners = (cor) => {
    document.documentElement.style.setProperty('--rounded-list', cornersOptions[cor].value)
}

// Set the border radius size on the gallery images.
export const selectImageCorners = (cor) => {
    document.documentElement.style.setProperty('--rounded-image', cornersOptions[cor].value)
}