module.exports = async (_, args) => {
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