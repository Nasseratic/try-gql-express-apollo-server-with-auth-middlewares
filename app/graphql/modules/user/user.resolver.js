const User = require("../../../models/User");
const { InputError, LoginError } = require("../../gqlErrors");
const { sign } = require("jsonwebtoken");

module.exports.userQuery = {
  async users(_, __, ctx) {
    try {
      let users = await User.find({});
      return users;
    } catch (error) {
      throw new InputError(error);
    }
  },
  async user(_, args) {
    try {
      let users = await User.find({ _id: args.id });
      return user;
    } catch (error) {
      throw new InputError(error);
    }
  },
  
}


module.exports.userMutation = {
  async login(_, args) {
    let { pass, email } = args;

    if (!pass || !email) InputError({ message: "Email and password required" });

    let user = await User.findOne({ email });

    //user not found
    if (!user) throw new LoginError();

    if (await user.comparePassword(pass, () => null)) {
      return await sign(user.toJSON(), _config("jwt.secret"), { expiresIn: _config("jwt.expires") });
    } else {
      throw new LoginError();
    }
  },
  async newUser(_, args) {
    let user = new User(args.user);
    try {
      let newUser = await user.save(user);
      return newUser;
    } catch (error) {
      throw new InputError(error);
    }
  },
  async editUser(_, args) {
    let { id, user } = args;
    let oldUser, updatedUser;
    try {
      oldUser = await User.findById(id);
      for (const key in user) {
        if (user[key] !== "") {
          oldUser[key] = user[key];
        }
      }
      return await oldUser.save();
    } catch (error) {
      throw new InputError(error);
    }
  }
}