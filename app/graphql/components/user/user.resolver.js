const User = require("../../../models/User");
const { InputError, LoginError } = require("../../gqlErrors");
const { sign } = require("jsonwebtoken");

// Queries
const user = require("./queries/user.query");
const users = require("./queries/users.query");

// Mutations
const login = require('./mutations/loginUser');
const newUser = require("./mutations/newUser");
const editUser = require("./mutations/editUser");


module.exports.userQuery = {
  user,
  users
}


module.exports.userMutation = {
  login,
  newUser,
  editUser
}