const express = require("express");
const expressGraphQL = require("express-graphql").graphqlHTTP;
const schema = require('./schema.js')
const app = express();
// entry point for everyone that wants to interact with our server
app.use('/graphql', expressGraphQL({
    schema:schema,
    graphiql:true // we want to use graphql ide to run our test
}));
app.listen("4000", () => {
    console.log("Server is listening to the port 4000");
});