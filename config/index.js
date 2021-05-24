const NODE_ENV = process.env.NODE_ENV

const config = {
    test: {
        MONGO_URI: `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@gti-shard-00-00.tcrun.mongodb.net:27017,gti-shard-00-01.tcrun.mongodb.net:27017,gti-shard-00-02.tcrun.mongodb.net:27017/test?ssl=true&replicaSet=atlas-tyqnx6-shard-0&authSource=admin&retryWrites=true&w=majority`
    },
    prod: {
        MONGO_URI: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@gti.tcrun.mongodb.net/prod?retryWrites=true&w=majority`
    }
}

module.exports = config[NODE_ENV]