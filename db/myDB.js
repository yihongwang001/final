const { MongoClient } = require("mongodb");
const objectID = require("mongodb").ObjectID;

function MyDB() {
  const MyDB = {};

  const uri = process.env.MONGO_URL || "mongodb://localhost:27017";

  MyDB.getPosts = async () => {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    try {
      await client.connect();

      const db = client.db("apt");
      const posts = db.collection("posts");

      const query = {};

      return (
        posts
          .find(query)
      
          .toArray()
          .finally(() => client.close())
      );
   
  };

  MyDB.getPostById = async (postId) => {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    try {
      await client.connect();

      const db = client.db("apt");
      const posts = db.collection("posts");

      const mongoId = new objectID(postId);

      return posts.findOne({ _id: mongoId }).finally(() => client.close());
    
  };

  return MyDB;
}

module.exports = MyDB();
