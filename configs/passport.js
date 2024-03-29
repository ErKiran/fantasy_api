const { Strategy, ExtractJwt } = require('passport-jwt');
const User = require('../models/user');
const { secretOrKey } = require('../configs/dev');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secretOrKey;

module.exports = async passport => {
    const res = new Strategy(opts, async (payload, done) => {
        try {
            const result = await User.findById(payload.id);
            if (result) {
                return done(null, result)
            }
            else {
                return done(null, false)
            }
        }
        catch (e) {
            throw e
        }
    });
    passport.use(res);
};
