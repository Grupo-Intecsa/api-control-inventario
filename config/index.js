const NODE_ENV = process.env.NODE_ENV || 'test'

const config = {
    test: {
        MONGO_URI: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cchavezmx.oemvf.mongodb.net/beotestdb?authSource=admin&replicaSet=atlas-8l423c-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true`
    }
}

module.exports = config[NODE_ENV]