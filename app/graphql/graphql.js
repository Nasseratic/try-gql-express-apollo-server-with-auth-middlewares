const {graphqlExpress} = require('apollo-server-express');
const {importSchema} = require('graphql-import');
const {makeExecutableSchema} = require('graphql-tools');
const {applyMiddleware} = require("graphql-middleware");
const permissions = require('./permissions');
const {formatError} = require('apollo-errors');
const jwt = require('jsonwebtoken');
// Import root resolver
const resolvers = require('./resolvers');
const {AuthError} = require("./gqlErrors");

// mport types
const typeDefs = importSchema("app/graphql/schema.graphql");

// Init the schema
const schema = applyMiddleware(makeExecutableSchema({ typeDefs, resolvers }), permissions);

// Must be after body parser
module.exports = graphqlExpress(req => {
  let user;
  try {
    // get user if exist using jwt
    user = jwt.verify(req.header('Authorization'),_config("jwt.secret"));
  } catch (error) {
    user = {};
  }
  return {
    formatError,
    schema,
    context: {
      user,// put user object in the context
    },
  };
});
