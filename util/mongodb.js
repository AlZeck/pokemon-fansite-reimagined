import { MongoClient } from 'mongodb'

const { DB_URL } = process.env

if (!DB_URL) {
  throw new Error(
    'Please define the DB_URL environment variable'
  )
}


/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongo

if (!cached) {
  cached = global.mongo = { conn: null, promise: null }
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }

    cached.promise = MongoClient.connect(DB_URL, opts).then((client) => {
      return {
        client,
        db: client.db('PokemonFanSite'),
      }
    })
  }
  cached.conn = await cached.promise
  return cached.conn
}