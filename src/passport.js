const path = require("path");
const fs = require("fs");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require('./models/User');


const pathToKey = path.join(__dirname, './id_rsa_pub.pem');
const PUB_KEY = fs.readFileSync(pathToKey, 'utf-8');

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: PUB_KEY,
    algorithms: ['RS256']
}


const strategy = new JwtStrategy(options, async (payload, done) => {
    console.log("Executing jwt strategy");
    try {
        User.findOne({ _id: payload.sub }, (err, user) => {
            console.log(user);
            if (user) {
                return done(null, user);
            } else {
                return done(null, false)
            }
        });
        
    } catch (error) {
        console.log(error)
        return done(error, null)
    }
});



module.exports = (passport) => {
    passport.use(strategy);
}
