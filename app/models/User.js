var mongoose = require("mongoose");
var bcrypt = require("bcrypt");

var schema = mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String
    },
    score: {
        type: Number,
        default: 0
    },
    lang: {
        type: String,
        default: 'en'
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }

}, {
        versionKey: false,
        timestamps: true
    }
);

schema.pre('save', function (next) {

    var user = this;

    // generate a salt

    if (user.isModified("password") || user.isNew) {

        bcrypt.genSalt(10, function (error, salt) {

            if (error) return next(error);

            // hash the password along with our new salt

            bcrypt.hash(user.password, salt, function (error, hash) {

                if (error) return next(error);

                // override the cleartext password with the hashed one

                user.password = hash;

                next(null, user);
            });
        });

    } else {
        next(null, user);
    }
});

/**
 * Compare raw and encrypted password
 * @param password
 * @param callback
 */
schema.methods.comparePassword = function (password, callback) {
    return new Promise(resolve => {
        bcrypt.compare(password, this.password, function (error, match) {
            if (error) callback(error);
            if (match) {
                resolve(true)
            } else {
                resolve(false)
            }
        });
    });
}

module.exports = mongoose.model("user", schema, "user");
