import { readdirSync } from 'fs-extra'

// Read directory and return files only.
export function readfiles(path) {
    return readdirSync(path, { withFileTypes: true })
        .filter((res) => res.isFile())
        .map((res) => res.name)
}

// Read directory and return folders only.
export function readfolders(path) {
    return readdirSync(path, { withFileTypes: true })
        .filter((res) => res.isDirectory())
        .map((res) => res.name)
}