const express = require("express");
const {graphql} = require('graphql')
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const passport = require('passport');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();
const db = require("./config/keys").mongoURI;

const root = {
  hello: () => {
    return 'Hello World'
  }
}

const schema = buildSchema(`
  type User {
    id: ID
    userName: String
    email: String
    name: String
  }

  type Query {
    users: [User]
    hello: String
  }
`)

// graphql(
//   schema,
//   `
//     {
//       users {
//         userName
//       }
//     }
//   `,
//   rootValue
// ).then(
//   console.log
// )



app.use('/graphql', 
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
  })  
)

// app.get('/', (req, res) => {
//   res.send('hello!')
// })

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch((err) => console.log(err));

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`server is running on ${port}`))