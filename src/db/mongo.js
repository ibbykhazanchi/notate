
import { MongoClient, ServerApiVersion } from 'mongodb';
const uri = process.env.REACT_APP_MONGO_URI


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    await getAccounts()
    // await addAccount()
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

async function getAccounts() {
    const db = client.db("Snipit")
    const coll = db.collection("accounts")
    const cursor = coll.find({_id: 1})
    await cursor.forEach(console.log)
}

async function addAccount(){
    const doc = {
        _id: 1,
        accessToken: "test!"
    }
    const db = client.db("Snipit")
    const coll = db.collection("accounts")
    const result = await coll.insertOne(doc)
    console.log(result.insertedId)
}

run().catch(console.dir);
