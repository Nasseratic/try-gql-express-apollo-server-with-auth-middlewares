const {createError } = require('apollo-errors');

module.exports.InputError  = createError('InputError', {
  message: 'Input Error'
});

module.exports.LoginError  = createError('LoginError', {
  message: 'Email or Password incorrect'
});

module.exports.AuthError  = createError('AuthError', {
  message: 'Auth Error'
});