import User from "../models/user.js";

// export const renderSignupForm = (req, res) => {
//   res.render(""); // Add the correct path for rendering signup form
// };

export const signup = async (req, res, next) => {
  const data={
    name:req.body.name,
    email:req.body.email,
    password:req.body.password,
    confirmPassword:req.body.confirmPassword
  }
  try {
    console.log(`object is `,data);
    let {name, email, password,confirmPassword } = data;
    let newUser = new User({ email,name });
    let registeredUser = await User.register(newUser, password);

    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Welcome to sunrise");
      res.redirect("/listings");
    });
  } catch (e) {
    console.log(e);
    req.flash("error", "Invalid username");
    res.redirect("/signup");
  }
};

// export const renderLoginForm = (req, res) => {
//   res.render("users/login.ejs");
// };

// export const login = async (req, res) => {
//   console.log(req.body);
//   console.log(res.locals.redirectUrl);
//   let direct = res.locals.redirectUrl || "/listings";
//   // res.redirect(direct);
// };

// export const logout = (req, res, next) => {
//   req.logOut((err) => {
//     if (err) {
//       return next(err);
//     }
//     req.flash("success", "You are successfully logged out");
//     res.redirect("/listings");
//   });
// };
