// Card view modes list.
export const modesViews = [
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

// Set the amount of columns to be displayed on card views.
export async function selectCardColumns(col) {
    document.documentElement.style.setProperty('--grid-cols-view', col)
}