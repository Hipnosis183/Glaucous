// Card view modes list.
export const cardViews = [
    { i: 0, name: 'Tall' },
    { i: 1, name: 'Large' },
    { i: 2, name: 'Compact' }
]

// Card image positions list.
export const imagePositions = [
    { i: 0, name: 'Normal' },
    { i: 1, name: 'Fill' }
]

// Card text positions list.
export const textPositions = [
    { i: 0, name: 'Center' },
    { i: 1, name: 'Left' }
]

// Google search key parameters.
export const googleKeys = [
    { i: 0, name: 'Full Title' },
    { i: 1, name: 'Original Title' },
    { i: 2, name: 'Developer' }
]

// Set the amount of columns to be displayed on card views.
export async function selectCardColumns(col) {
    document.documentElement.style.setProperty('--grid-cols-view', col)
}