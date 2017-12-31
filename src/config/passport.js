const passport = require("passport");
const LocalStratagy = require("passport-local").Strategy;
const User = require("../api/models/users.model");

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

passport.use(new LocalStratagy({
    usernameField: "username",
    passwordField: "password",
},
(username, password, done) => {
    User.findOne({ username }, (err, user) => {
        if (err) return done(err);

        if (!user) {
            return done(null, false, { message: "Usuário não existe" });
        }

        if (!user.validPassword(password)) {
            return done(null, false, { message: "Senha Incorreta" });
        }
        return done(null, user);
    });
},
));

module.export = passport;
