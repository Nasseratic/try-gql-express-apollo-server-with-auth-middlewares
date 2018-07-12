const { rule, shield, and, or, not } = require('graphql-shield');

// Rules

const isAuthenticated = rule()(async (parent, args, ctx, info) => {
  return ctx.user.email !== undefined
})

const isAdmin = rule()(async (parent, args, ctx, info) => {
  return ctx.user.role === 'admin'
})


const isSelf = rule()(async (parent, args, ctx, info) => {
  return ctx.user._id === args.id
})

const isEditor = rule()(async (parent, args, ctx, info) => {
  return ctx.user.role === 'editor'
})

module.exports = shield({
  Query: {
    user: isAuthenticated,
    users: isAuthenticated
  },
  Mutation: {
    newUser: and( isAuthenticated , isAdmin ) ,
    editUser: and(  isAuthenticated , isSelf )
  },
})










