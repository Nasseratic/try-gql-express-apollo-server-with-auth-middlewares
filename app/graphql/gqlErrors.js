const {createError } = require('apollo-errors');

module.exports.InputError  = createError('InputError', {
  message: 'Input Error'
});