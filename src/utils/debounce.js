// Simple debounce function.
export function debounce(func, wait) {
    // Set timer.
    let timer
    // Debounced function.
    return (...args) => {
        // Reset timer (cancel timeout function).
        clearTimeout(timer)
        // Set timeout function.
        timer = setTimeout(() => { func.apply(this, args) }, wait)
    }
}