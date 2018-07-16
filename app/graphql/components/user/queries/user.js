module.exports = async (_, args) => {
  try {
    let users = await User.find({ _id: args.id });
    return user;
  } catch (error) {
    throw new InputError(error);
  }
}