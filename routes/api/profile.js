const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { body, validationResult } = require("express-validator");

const Profile = require("../../models/Profile");
const User = require("../../models/User");
const checkObjectId = require("../../middleware/checkObjectId");

router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name", "avatar"]);
    if (!profile) {
      res.status(400).json({ msg: "There is no profile of this user" });
    }
    res.json(profile);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

// route post api/profile

// @desc create or update a user profile

// @access Private

// check for filling in the profile
router.post(
  "/",
  [
    auth,
    [
      body("skills", "skills required").not().isEmpty(),

      body("status", "Status is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      company,
      location,
      website,
      bio,
      skills,
      status,

      youtube,

      instagram,
      linkedIn,
      facebook,
    } = req.body;
    // build profile feilds

    // addiing to database will need to be changed later

    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (skills) {
      // changing a string into an array, to store in databse. THIS IS A REQUIRED FEILD
      profileFields.skills = skills.split(",").map((skill) => skill.trim());
    }

    console.log(profileFields.skills);

    // build social feilds array
    profileFields.social = {};

    if (youtube) profileFields.youtube = youtube;
    if (instagram) profileFields.instagram = instagram;
    if (linkedIn) profileFields.linkedIn = linkedIn;

    try {
      let profile = await Profile.findOne({ user: req.user.id });
      // if profile found it will update it
      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        return res.json(profile);
      }
      // if not need to create one
      profile = new Profile(profileFields);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }

    res.send("its working!");
  }
);

// route post api/profile/

// @desc get app profils

// @access public

router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.json(profiles);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

// route post api/profile/user/:user_id

// @desc get profile by user ID

// @access public

router.get(
  "/user/:user_id",
  checkObjectId("user_id"),
  async ({ params: { user_id } }, res) => {
    try {
      const profile = await Profile.findOne({
        user: user_id,
      }).populate("user", ["name", "avatar"]);

      if (!profile) return res.status(400).json({ msg: "Profile not found" });

      return res.json(profile);
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({ msg: "Server error" });
    }
  }
);

// route delete api/profile

// @desc delete profile, user, and posts

// @access private

router.delete("/", auth, async (req, res) => {
  try {
    // Remove user posts
    // await Post.deleteMany({ user: req.user.id });
    // Remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    // Remove user
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: "User deleted" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

// route Put api/profile/experiance

// @desc add profile experience

// @access private

router.put(
 '/experience',
 [
   auth,
   [
     body('title', 'Title is required').not().isEmpty(),
     body('company', 'Company is required').not().isEmpty(),
     body('from', 'From date is required and needs to be from the past')
       .not()
       .isEmpty()
       .custom((value, { req }) => (req.body.to ? value < req.body.to : true))
   ]
 ],
 async (req, res) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
     return res.status(400).json({ errors: errors.array() });
   }

   const {
     title,
     company,
     location,
     from,
     to,
     current,
     description
   } = req.body;

   const newExp = {
     title,
     company,
     location,
     from,
     to,
     current,
     description
   };

   try {
     const profile = await Profile.findOne({ user: req.user.id });

     profile.experience.unshift(newExp);

     await profile.save();

     res.json(profile);
   } catch (err) {
     console.error(err.message);
     res.status(500).send('Server Error');
   }
 }
);

// route Delete api/profile/experiance/:exp_id

// @desc add profile experience from profile 

// @access private


router.delete('/experience/:exp_id', auth, async (req,res)=>{

 try {

  const profile = await Profile.findOne({ user: req.user.id });

  // getting profile of the user the remove index

  const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id);
  
  //splicing out the index 

  profile.experience.splice(removeIndex, 1); 

  await profile.save(); 

  res.json(profile); 
  

  
  
 } catch (err) {
  console.log(err)
  
 }
})


module.exports = router;
