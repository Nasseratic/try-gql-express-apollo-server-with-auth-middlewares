module.exports = async (_, __, ctx) => {
  try {
    let users = await User.find({});
    return users;
  } catch (error) {
    throw new InputError(error);
  }
}