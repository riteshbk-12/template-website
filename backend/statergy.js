import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GitHubStrategy } from "passport-github2";
import {Strategy as LocalStrategy} from "passport-local";
import bcrypt from "bcryptjs";
import session from "express-session";
import pool from "./server.js"; // PostgreSQL connection

// Store session in PostgreSQL
import connectPgSimple from "connect-pg-simple";
const PgStore = connectPgSimple(session);

// Session Middleware
export const configureSession = (app) => {
  app.use(session({
    store: new PgStore({ pool }),
    secret: "supersecretkey",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true, maxAge: 86400000 }, // 1 day
  }));

  app.use(passport.initialize());
  app.use(passport.session());
};

// Serialize and Deserialize User
passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
  try {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    done(null, result.rows[0]);
  } catch (err) {
    done(err, null);
  }
});


passport.use(
  new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
    try {
      const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

      if (result.rows.length === 0) return done(null, false, { message: "User not found" });

      const user = result.rows[0];
      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) return done(null, false, { message: "Incorrect password" });

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);


// ✅ Google OAuth Strategy
passport.use(new GoogleStrategy({
  clientID: "1020917348495-aqjghjblmu0ku82sjcc40drlgfievedn.apps.googleusercontent.com",
  clientSecret: "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",
  callbackURL: "http://localhost:5000/auth/google/callback",
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await pool.query("SELECT * FROM users WHERE email = $1", [profile.emails[0].value]);

    if (user.rows.length === 0) {
      user = await pool.query(
        "INSERT INTO users (email, username, password) VALUES ($1, $2, $3) RETURNING *",
        [profile.emails[0].value, profile.displayName, "google"]
      );
    }

    done(null, user.rows[0]);
  } catch (err) {
    done(err, null);
  }
}));

// ✅ GitHub OAuth Strategy
passport.use(
  new GitHubStrategy(
    {
      clientID: "Ov23lizzfS3qJwRyuBxu",
      clientSecret: "39cc0b50409e0eb96b99c8741176f87807879c94",
      callbackURL: "http://localhost:5000/auth/github/callback",
      scope: ["user:email"], // Request email permission
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Fetch user’s emails using GitHub API
        const emailResponse = await fetch("https://api.github.com/user/emails", {
          headers: {
            Authorization: `token ${accessToken}`,
            Accept: "application/vnd.github.v3+json",
          },
        });

        const emails = await emailResponse.json();
        console.log("GitHub Emails:", emails); // Debugging

        // Find the primary email (GitHub returns an array)
        const primaryEmail = emails.find((email) => email.primary && email.verified)?.email;

        // If no email, create a fallback
        const email = primaryEmail || `${profile.username}@github.com`;

        const username = profile.username || `github_${profile.id}`;
        const provider = "github";

        // Insert into DB
        let user = await pool.query(
          "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
          [username, email, provider]
        );

        return done(null, user.rows[0]);
      } catch (error) {
        return done(error);
      }
    }
  )
);

