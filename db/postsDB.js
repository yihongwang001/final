const { MongoClient } = require("mongodb");
const objectID = require("mongodb").ObjectID;
require("dotenv").config();

function PostsDB() {
  const postsDB = {};

  const uri =
    "mongodb+srv://webdev:pass123@cluster0.nmh7f.mongodb.net/<dbname>?retryWrites=true&w=majority";
  postsDB.getPosts = async () => {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    try {
      await client.connect();

      const db = client.db("apt");
      const posts = db.collection("posts");

      const query = {};

      return posts
        .find(query)
        .toArray()
        .finally(() => client.close());
    } catch (err) {
      console.log("Error", err);
    }
  };

  postsDB.getPostById = async (postId) => {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    try {
      await client.connect();

      const db = client.db("apt");
      const posts = db.collection("posts");

      const mongoId = new objectID(postId);

      return posts.findOne({ _id: mongoId }).finally(() => client.close());
    } catch (err) {
      console.log("Error", err);
    }
  };
  postsDB.postComment = async (postId, username, comment) => {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    try {
      await client.connect();

      const db = client.db("apt");
      const posts = db.collection("posts");

      const mongoId = new objectID(postId);

      return posts
        .updateOne(
          { _id: mongoId },
          { $push: { comments: { description: comment, username } } }
        )
        .finally(() => client.close());
    } catch (err) {
      console.log("Error", err);
    }
  };

  return postsDB;
}

module.exports = PostsDB();
