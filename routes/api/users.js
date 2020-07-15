const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const brcypt = require("bcryptjs");
const normalize = require("normalize-url");
const User = require("../../models/User");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const config = require("config");
// @route    POST api/users
// @desc     Register user
// @access   Pub

router.post(
  "/",
  [
    body("name", "Name is required!").not().isEmpty(),

    body("email", "Please enter a valid emai").isEmail(),

    body(
      "password",
      "please enter a password that is atleast 6 characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    // see if user exists

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ erros: [{ msg: "User already exists" }] });
      }

      // get users gravatar
      const avatar = normalize(
        gravatar.url(email, {
          s: "200",
          r: "pg",
          d: "mm",
        }),
        { forceHttps: true }
      );

      user = new User({
        name,
        email,
        avatar,
        password,
      });

      // encrypt password using brcypt

      const salt = await brcypt.genSalt(10);

      user.password = await brcypt.hash(password, salt);

      await user.save();
      // return jasonwebtoken

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),

        //change before deploying to heroku

        { expiresIn: 3500000 }, 
        (err, token) => {
          if(err) throw err; 
          res.json({token})
        }
      );

      // res.send("User Registerd");

    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error");
    }
  }
);
module.exports = router;
