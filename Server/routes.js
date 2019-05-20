// app/routes.js
module.exports = function(app, passport) {
  // =====================================
  // HOME PAGE (with login links) ========
  // =====================================
  app.get("/", function(req, res) {
    console.log("Main");
    res.render("./index.ejs"); // load the index.ejs file
  });

  // =====================================
  // LOGIN ===============================
  // =====================================
  // show the login form
  app.get("/login", function(req, res) {
    console.log("Login Route");
    // render the page and pass in any flash data if it exists
    res.render("./login.ejs", {
      message: req.flash("loginMessage")
    });
  });

  // process the login form
  app.post(
    "/login",
    function(req, res, next) {
      console.log("routes/user.js, login, req.body: ");
      console.log(req.body);
      next();
    },
    passport.authenticate("local-login"),
    (req, res) => {
      console.log("logged in", req.user);
      var userInfo = {
        username: req.user.username
      };
      res.send(userInfo);
    }
  );

  // =====================================
  // SIGNUP ==============================
  // =====================================
  // show the signup form
  // app.get("/signup", function(req, res) {
  //   // render the page and pass in any flash data if it exists
  //   res.render("./signup.ejs", {
  //     message: req.flash("signupMessage")
  //   });
  // });

  // process the signup form
  app.post(
    "/signup",
    function(req, res, next) {
      console.log("routes/user.js, login, req.body: ");
      console.log(req.body);
      next();
    },
    passport.authenticate("local-signup"),
    (req, res) => {
      console.log("Signup: ", req.user);
      var userInfo = {
        username: req.user.username
      };
      res.send(userInfo);
    }
  );

  // =====================================
  // PROFILE SECTION =====================
  // =====================================
  // we will want this protected so you have to be logged in to visit
  // we will use route middleware to verify this (the isLoggedIn function)
  app.get("/profile", isLoggedIn, function(req, res) {
    res.render("./profile.ejs", {
      user: req.user // get the user out of session and pass to template
    });
  });

  // =====================================
  // LOGOUT ==============================
  // =====================================
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  app.get("/loggedIn", function(req, res) {
    console.log("User: ", req.user);
    if (req.user) {
      console.log("true");
      return res.send(true);
    } else {
      console.log("false");
      return res.send(false);
    }
  });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) return next();

  // if they aren't redirect them to the home page
  res.redirect("/");
}
