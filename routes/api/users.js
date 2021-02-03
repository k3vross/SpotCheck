const bcrypt = require('bcryptjs'); 
const express = require('express'); 
const jwt = require('jsonwebtoken'); 
const router = express.Router(); 
const {check, validationResult} = require('express-validator');
const User = require('../../models/User');

const validate = [
  check('userName')
    .isLength({min: 3})
    .withMessage('Username is required, must be at least 3 characters'),
  check('email')
    .isEmail()
    .withMessage('Please provide a valid email'),
  check('password')
    .isLength({min: 6})
    .withMessage('Password must be at least 6 characters')
]

const generateToken = user => {
  return jwt.sign(
    {_id: user._id, email: user.email, userName: user.userName, name: user.name}, SECRET123 
  )
}

router.post('/signup', validate, async (req, res) => {
  const errors = validationResult(req); //takes req data and validates it against validate

  if (!errors.isEmpty()) {
    return res.status(422).json({errors: errors.array()})
  }

  const userExist = await User.findOne({email: req.body.email});
  if (userExist) return res.status(400).send({success: false, message: 'Email already exists'});

  const salt = await bcrypt.genSalt()
  const hashPassword = await bcrypt.hash(req.body.password, salt)

  const user = new User({
    userName: req.body.userName,
    email: req.body.email,
    password: hashPassword,
    name: req.body.name,
  });

  try {
    const savedUser = await user.save();
    const token = generateToken(user)
    res.send({success: true, data: {
      id: savedUser._id,
      userName: savedUser.userName,
      email: savedUser.email,
      name: savedUser.name
    },
    token
  })

  } catch (error) {
    res.status(400).send({success: false, error})
  }
})

module.exports = router;