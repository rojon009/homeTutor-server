const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xfpad.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 5000;

client.connect((err) => {
  // const orderCollection = client.db("boighor").collection("orders");
  // const booksCollection = client.db("boighor").collection("books");

  const serviceCollection = client.db("tutorDB").collection("services");
  const reviewCollection = client.db("tutorDB").collection("reviews");
  const adminCollection = client.db("tutorDB").collection("admins");
  const bookingCollection = client.db("tutorDB").collection("bookings");



  app.post("/services/addService", (req,res) => {
    const service = req.body;
    if(service) {
      serviceCollection
      .insertOne(service)
      .then(result => {
        res.send(result.insertedCount > 0)
      })
      .catch(err => {
        res.send(err)
      })
    }
  })

  app.get("/services", (req,res) => {
    serviceCollection
    .find({})
    .toArray((err,docs)=>{
      res.send(docs)
    })
  })

    app.get("/services/:id", (req, res) => {
    serviceCollection
      .findOne({
        _id: new ObjectID(req.params.id)
      })
      .then((result) => res.send(result));
  });

  app.delete("/services/:id", (req,res)=>{
    serviceCollection
    .findOneAndDelete({_id: new ObjectID(req.params.id)})
    .then(result => res.send(result))
  })





  app.post("/reviews/addReviews", (req,res) => {
    const review = req.body;
    if(review) {
      reviewCollection
      .insertOne(review)
      .then(result => {
        res.send(result.insertedCount > 0)
      })
      .catch(err => {
        res.send(err)
      })
    }
  })

  app.get("/reviews", (req,res) => {
    reviewCollection
    .find({})
    .toArray((err,docs)=>{
      res.send(docs)
    })
  })





  app.post("/bookings/addBooking", (req,res) => {
    const booking = req.body;
    if(booking) {
      bookingCollection
      .insertOne(booking)
      .then(result => {
        res.send(result.insertedCount > 0)
      })
      .catch(err => {
        res.send(err)
      })
    }
  })

  app.get("/bookings", (req,res) => {
    bookingCollection
    .find({})
    .toArray((err,docs)=>{
      res.send(docs)
    })
  })

  app.delete("/bookings", (req,res)=>{
    bookingCollection
    .deleteMany({})
    .then(result => res.send(result.deletedCount > 0))
  })

  app.get("/bookings/user/:uid", (req,res) => {
    bookingCollection
    .find({userId: req.params.uid})
    .toArray((err, docs) => {
        res.send(docs)
    })
  })

    app.post("/bookings", (req, res) => {
    bookingCollection
      .insertOne(req.body)
      .then((result) => {
        res.send(result.insertedCount > 0);
      })
      .catch((err) => {
        res.send(err);
      });
  });

  //   app.get("/booking/:uid", (req,res) => {
  //     orderCollection
  //     .find({userId: req.params.uid})
  //     .toArray((err, docs) => {
  //         res.send(docs)
  //     })
  // })

  app.get("/bookings/booking/:id", (req, res) => {
    bookingCollection
      .findOne({
        _id: new ObjectID(req.params.id)
      })
      .then((result) => res.send(result));
  });

  app.patch("/bookings/booking/:id",(req,res)=>{
    bookingCollection
    .findOneAndUpdate({_id: new ObjectID(req.params.id)}, {
      $set: req.body
    }, {
      returnOriginal: true
    })
    .then(result => {
      res.send(result)
    })
  })

  app.delete("/bookings/:id", (req,res)=>{
    bookingCollection
    .findOneAndDelete({_id: new ObjectID(req.params.id)})
    .then(result => res.send(result))
  })
  
  app.get("/admins", (req, res)=>{
    adminCollection
    .find({})
    .toArray((err, docs) =>{
      res.send(docs)
    })
  })

  app.post("/makeAdmin", (req,res)=>{
    adminCollection
    .insertOne(req.body)
    .then(result => res.send(result.insertedCount > 0))
  })


})



app.listen(port, () => {
  console.log(`This app listening at http://localhost:${port}`);
});
