const express = require("express");
const authRoutes = require("./routes/auth-Routes");
const passportSetup = require("./config/passport-setup");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const cookieSession = require("cookie-session");
const passport = require("passport");
const session = require('express-session')
const profileRoutes = require('./routes/profile-routes');

const app = express();

//set up view engine
app.set("view engine", "ejs");


//initialize passport
app.use(session({secret:keys.session.cookieKey}))


// app.use(
//   cookieSession({
//     maxAge: 24 * 60 * 60 * 1000,
//     keys: [keys.session.cookieKey],
//   })
// );

app.use(passport.initialize());
app.use(passport.session());



//connect to mongodb
mongoose.connect(keys.mongodb.dbURI, () => {});

//set up routes
app.use("/auth", authRoutes);
app.use('/profile', profileRoutes);

//create home route
app.get("/", (req, res) => {
  res.render("home" , {user: req.user});
});

const PORT = process.env.PORT || 3000 ;
app.listen(PORT);
