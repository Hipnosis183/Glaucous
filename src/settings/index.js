// Card image positions list.
export const cardImagesOptions = [
    { i: 0, name: 'Default' },
    { i: 1, name: 'Cover' },
    { i: 2, name: 'Title' },
    { i: 3, name: 'In-Game' }
]

// Card image positions list.
export const cardTextShowOptions = [
    { i: 0, name: 'Selected' },
    { i: 1, name: 'Always' },
    { i: 2, name: 'Never' }
]

// Card image positions list.
export const cardTextStyleOptions = [
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

// Google search key parameters.
export const googleKeys = [
    { i: 0, name: 'Full Title' },
    { i: 1, name: 'Original Title' },
    { i: 2, name: 'Developer' }
]

// Set the amount of columns to be displayed on card views.
export const selectListColumns = (col) => {
    document.documentElement.style.setProperty('--grid-cols-view', col)
}