// Simple throttle function.
export function throttle(func, wait) {
    // Set waiter.
    let waiting = false
    // Throttled function.
    return (...args) => {
        if (!waiting) {
            func.apply(this, args)
            // Start waiting.
            waiting = true
            // Set timeout function.
            setTimeout(() => { waiting = false }, wait)
        }
    }
}