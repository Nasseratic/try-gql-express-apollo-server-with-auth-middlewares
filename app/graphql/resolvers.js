const {userQuery,userMutation} = require('./modules/user/user.resolver');

module.exports = {
  Query: {
    ...userQuery
  },
  Mutation: {
    ...userMutation
  }
}