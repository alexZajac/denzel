const { MONGO_URI } = require("./constants");
const { MongoClient } = require("mongodb");

const getRandomMovie = () => {
  const client = new MongoClient(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  return new Promise((resolve, reject) => {
    client.connect(async err => {
      if (err) reject(err);
      const collection = client.db("main").collection("movies");
      // random movie syntax, on the db side instead of fetching all documents
      const random_movie = await collection
        .aggregate([{ $sample: { size: 1 } }])
        .toArray();
      if (random_movie.length > 0) resolve(random_movie[0]);
      else reject({ message: "No movie found on the DB." });
    });
  });
};

module.exports = {
  getRandomMovie
};
