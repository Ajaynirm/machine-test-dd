import pkg from 'passport-local';
import passport from 'passport';
import bcrypt from 'bcrypt';
import t_login from '../model/login.js';

const { Strategy: LocalStrategy } = pkg;

export default function initialise(passport) {
    // Authentication function
    async function authenticateUser(t_userName, t_Pwd, done) {
        try {
            const user = await t_login.findOne({ t_userName });
            if (!user) {
                return done(null, false, { message: 'No user found' });
            }

            const isPasswordMatched = await bcrypt.compare(t_Pwd, user.t_Pwd);
            if (isPasswordMatched) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Password incorrect' });
            }
        } catch (e) {
            return done(e);
        }
    }

    // Initialize passport with the LocalStrategy
    passport.use(
        new LocalStrategy(
            { usernameField: 't_userName' }, // This maps `t_userName` from the request body to the `LocalStrategy`
            authenticateUser
        )
    );

    // Serialize user to store in session
    passport.serializeUser((user, done) => {
        done(null, user.t_userName); // Store user ID in session
    });

    // Deserialize user to retrieve user details from session
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await t_login.findOne({t_userName}); // Fetch user details by ID
            done(null, user);
        } catch (e) {
            done(e);
        }
    });
}
