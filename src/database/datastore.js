const { connect } = require('marpat')

let database
const uriRoot = 'nedb://database'
export async function connectDatastore (uri) {
    let uriConnect = uri != null
    ? uriRoot + '/' + uri : uriRoot
    connect(uriConnect).then(db => {
        database = db
    })
}