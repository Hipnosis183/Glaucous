const { connect } = require('marpat')
// import path from 'path'
// import { remote } from 'electron'

let database
const uri = 'nedb://database'

connect(uri).then(function(db) {
    database = db;
});