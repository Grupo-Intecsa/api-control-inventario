const NODE_ENV = process.env.NODE_ENV

const config = {
    test: {
        MONGO_URI: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@gti.tcrun.mongodb.net/test?retryWrites=true&w=majority`
    },
    prod: {
        MONGO_URI: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@gti.tcrun.mongodb.net/prod?retryWrites=true&w=majority`
    }
}

module.exports = config[NODE_ENV]