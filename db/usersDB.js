const { MongoClient } = require("mongodb");
require("dotenv").config();
function UsersDB() {
  const usersDB = {};

const uri = process.env.MONGO_URL || "mongodb://localhost:27017";


  usersDB.getUsers = async () => {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    try {
      await client.connect();

      const db = client.db("apt");
      const users = db.collection("users");

      const query = {};

      return users
        .find(query)
        .sort({ _id: -1 })
        .limit(10)
        .toArray()
        .finally(() => client.close());
    } catch (err) {
      console.log("Error", err);
    }
  };

  usersDB.createUser = async (user) => {
    const client = new MongoClient(uri, { useUnifiedTopology: true });

    await client.connect();

    const db = client.db("apt");
    const users = db.collection("users");

    return await users.insertOne(user);
  };

  usersDB.findByUsername = async (username) => {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    try {
      await client.connect();

      const db = client.db("apt");
      const users = db.collection("users");

      return users.findOne({ username }).finally(() => client.close());
    } catch (err) {
      console.log("Error", err);
    }
  };

  return usersDB;
}

module.exports = UsersDB();
