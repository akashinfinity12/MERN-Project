const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const User = require("../models/user");

let DUMMY_USERS = [
  {
    id: "u1",
    name: "Akash",
    email: "akash@gmail.com",
    password: "password1",
  },
  {
    id: "u2",
    name: "Aaditya",
    email: "aaditya@gmail.com",
    password: "password2",
  },
  {
    id: "u3",
    name: "Aman",
    email: "aman@gmail.com",
    password: "password3",
  },
];

const getAllUsers = (req, res, next) => {
  res.json({ data: DUMMY_USERS });
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return next(new HttpError("Invalid request body", 422));
  const { name, email, password, places } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (error) {
    return next(new HttpError("Something went wrong. Could not sign up", 500));
  }

  if (existingUser)
    return next(
      new HttpError("User already exists. Please login instead", 422)
    );

  const createdUser = new User({
    name,
    email,
    image: "https://live.staticflickr.com/7631/26849088292_36fc52ee90_b.jpg",
    password,
    places,
  });

  try {
    await createdUser.save();
  } catch (err) {
    return next(new HttpError("Signing up failed, please try again.", 500));
  }

  res.status(201).json({ user: createdUser });
};

const login = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return next(new HttpError("Invalid request body", 422));
  const { email, password } = req.body;
  const identifiedUser = DUMMY_USERS.find(
    (currUser) => currUser.email === email
  );
  if (!identifiedUser || !identifiedUser.password === password)
    return next(new HttpError("Could not find the user", 401));
  res.json({ message: "login successful" });
};

exports.getAllUsers = getAllUsers;
exports.signup = signup;
exports.login = login;
