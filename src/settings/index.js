// Set the amount of columns to be displayed on grid views.
export async function selectGridCols(col) {
    document.documentElement.style.setProperty('--grid-cols-view', col)
}