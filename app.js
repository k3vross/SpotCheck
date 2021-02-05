const express = require("express");
const {graphql} = require('graphql')
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const passport = require('passport');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const userRoutes = require('./routes/api/users');


const app = express();
app.use(express.json())

app.use('/api/users', userRoutes)
const db = require("./config/keys").mongoURI;
const fakeDB = {
  '1': {
    id: '1',
    userName: 'kevDOG', 
    email: 'kevin@spotcheck.com', 
    name: 'kevin' 
  }
}; 

const schema = buildSchema(`
  type User {
    id: String
    userName: String
    email: String
    name: String
  }

  type Query {
    getUser(userId: String!) : User
    getUsers: [User]
    hello: String
  }

  type Mutation {
    makeUser(userName: String!, email: String!, name: String!) : User
  }
`)



class User {
  constructor (userName, email, name) {
    this.userName = userName; 
    this.email = email; 
    this.name = name; 
    this.id = require('crypto').randomBytes(10).toString('hex'); 
  }
}

const root = {
  hello: () => {
    return 'Hello World'
  },

  getUser: ({userId}) => {
    return fakeDB[userId]; 
  }, 

  getUsers: () => {
    const users = []; 
    for (person in fakeDB) {
      users.push(person)
    }
    return users; 
  }, 

  makeUser: ({userName, email, name}) => {
    const newPerson = new User(userName, email, name); 
    fakeDB[newPerson.id] = newPerson
    return fakeDB[newPerson.id]; 
  }
}

app.use('/graphql', 
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
  })  
)


mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch((err) => console.log(err));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server is running on ${port}`))