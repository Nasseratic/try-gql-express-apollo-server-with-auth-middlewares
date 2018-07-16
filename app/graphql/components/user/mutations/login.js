module.exports = async (_, args) => {
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
}