const User = require("../../../models/User");
const {InputError} = require("../../gqlErrors");

module.exports.userQuery = {
  async users() {
    try {
      let users = await User.find({});
      return users; 
    } catch (error) {
      throw new InputError({data:error});
    }
  },
  async user(_, args) {
    try {
      let users = await User.find({_id:args.id});
      return user; 
    } catch (error) {
      throw new InputError({data:error});      
    }
  }
}


module.exports.userMutation = {
  async newUser(_, args) {
    let user = new User(args.user);
    try {
      let newUser = await user.save(user);
      return newUser;      
    } catch (error) {
      throw new InputError({data:error});       
    }    
  },
  editUser(_, args) {
    let { id, user } = args;
    User.findById(id, (error, oldUser) => {
      if (error) throw new Error(error);
      if (!oldUser) throw new Error("User not found");
      for (let key in user) {
           if (user[key]!=='') {
             oldUser[key] = user[key];
           }
      }
      oldUser.save(function (error, updatedUser) {
        if (error) throw new Error(error);
        return updatedUser;
      });
    });
  }
}