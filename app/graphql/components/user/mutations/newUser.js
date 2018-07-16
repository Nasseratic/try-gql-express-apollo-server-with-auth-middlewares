module.exports = async (_, args) => {
  let user = new User(args.user);
  try {
    let newUser = await user.save();
    return newUser;
  } catch (error) {
    throw new InputError(error);
  }
}