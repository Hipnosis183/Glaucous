import Datastore from 'nedb-promises'
import path from 'path'
import { remote } from 'electron'

let db = {}

db.games = new Datastore({
  autoload: true,
  filename: path.join(remote.app.getPath('userData'), '/data.games.db')
})
db.platforms = new Datastore({
  autoload: true,
  filename: path.join(remote.app.getPath('userData'), '/data.platforms.db')
})
db.developers = new Datastore({
  autoload: true,
  filename: path.join(remote.app.getPath('userData'), '/data.developers.db')
})

export default db