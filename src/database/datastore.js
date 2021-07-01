const crypto = require('crypto')
const { connect } = require('marpat')

let database
const uri = 'nedb://database'

connect(uri).then(function (db) {
    database = db;
});

// Generate a random, 16 characters long ID.
// If a collision happens, NeDB will generate a new ID.
export function generateID() {
    return crypto.randomBytes(Math.ceil(Math.max(8, 16 * 2)))
        .toString('base64')
        .replace(/[+\/]/g, '')
        .slice(0, 16)
        .toUpperCase();
}

/*
While at first I thought that having separated databases for
each platform would be not only more convinient, but also more
performant, the overhead of constantly changing the datastore
connections is much greater than searching in a single database
within the same connection. Here's a benchmark:

Sample: 20 platforms, 500 games each (10.000 entries total).
All fields filled with substantial amounts of data.

Loading time with datastore changing:

-ListPlatforms: 6-7 seconds
-ViewPlatform: 3 seconds
-ViewGame: 1-1.5 seconds

Loading time without datastore changing:

-ListPlatforms: 2 seconds
-ViewPlatform: 4 seconds
-ViewGame: Instantaneous

Not only the times are a lot faster, but also make other
queries besides 'by platform' possible, like 'by developer'.
The only query benefitted by the first model is not even
by much of a margin, and the payoff is totally worth it.
*/