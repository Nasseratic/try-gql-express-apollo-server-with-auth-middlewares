const {graphqlExpress} = require('apollo-server-express');
const {importSchema} = require('graphql-import');
const {makeExecutableSchema} = require('graphql-tools');
const {applyMiddleware} = require("graphql-middleware");
const permissions = require('./permissions');
const {formatError} = require('apollo-errors');

// Import root resolver
const resolvers = require('./resolvers');

// mport types
const typeDefs = importSchema("app/graphql/schema.graphql");

// Init the schema
const schema = applyMiddleware(makeExecutableSchema({ typeDefs, resolvers }), permissions);

// Must be after body parser
module.exports = graphqlExpress(req => {
  // Some sort of auth function
  return {
    formatError,
    schema,
    context: {
      user: req.header('Authorization'),
    },
  };
});
