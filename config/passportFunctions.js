class PassportFunctions {
  constructor(passport) {
    console.log("Const: ", passport);
    this.passport = passport;
  }
  authenticateLocal(req, res) {
    return new Promise((resolve, reject) => {
      console.log("authLocal: ", req);
      this.passport.authenticate(
        "local-signup",
        { session: false },
        (err, data, info) => {
          console.log("Err: ", err);
          console.log("Data: ", data);
          console.log("Info: ", info);
          if (err) reject(err, info);
          resolve({ data, info });
        }
      )(req, res);
    });
  }
  localLogin(req, res) {
    return new Promise((resolve, reject) => {
      console.log("localLogin: ", req.user);
      this.passport.authenticate("local-login", (err, data, info) => {
        console.log("Err: ", err);
        console.log("Data: ", data);
        console.log("Info: ", req);

        if (err) reject(err, info);
        resolve({ data, info });
      })(req, res);
    });
  }
}

module.exports = passport => {
  return new PassportFunctions(passport);
};
