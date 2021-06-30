const corsOptions = {
  origin: 'http://localhost:3000/',
  optionsSuccessStatus: 200
}

const mongoURL = "mongodb+srv://"+process.env["mongo-user"]+":" + process.env['mongo-passcode'] + "@cluster0.i37zw.mongodb.net/data";

module.exports.corsOptions = corsOptions;
module.exports.mongoURL = mongoURL;