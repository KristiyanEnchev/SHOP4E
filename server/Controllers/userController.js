import expressAsyncHandler from 'express-async-handler';
import User from '../Models/userModel.js';
import bcrypt from 'bcryptjs';

//GET ALL USERS
export const getAll = expressAsyncHandler(async (req, res) => {
  const query = req.query.new;
  const users = query
    ? await User.find().sort({ _id: -1 }).limit(5)
    : await User.find();
  res.status(200).json(users);
});

//GET USER BY ID
export const getUser = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId);

  if (user) {
    res.send(user);
  } else {
    res.status(404).send({ message: 'User Not Found' });
  }
});

//UPDATE USER
export const updateUser = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.profile.firtsName =
      req?.body?.profile?.firstName || user.profile.firtsName;
    user.profile.lastName =
      req?.body?.profile?.lastName || user.profile.lastName;
    user.profile.avatar = req?.body?.profile?.avatar || user.profile.avatar;
    user.isAdmin = Boolean(req.body.isAdmin);
    const updatedUser = await user.save();
    res.send({ message: 'User Updated', user: updatedUser });
  } else {
    res.status(404).send({ message: 'User Not Found' });
  }
});

//DELETE USER
export const deleteUser = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId);

  if (user) {
    if (user.email === 'admin@example.com') {
      return res.status(400).send({ message: 'Can Not Delete Admin User' });
    }

    await User.findByIdAndDelete(req.params.userId);
    res.send({ message: 'User Deleted' });
  } else {
    res.status(404).send({ message: 'User Not Found' });
  }
});

//CREATE USER
export const createUser = expressAsyncHandler(async (req, res) => {
  const existing = await User.findOne({ email: req.body.email });

  if (existing) {
    return res.status(401).send({ message: 'Email is taken' });
  }

  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password),
    profile: {
      firstName: req.body.profile.firstName,
      lastName: req.body.profile.lastName,
      avatar: req.body.profile.avatar,
    },
  });
  console.error(newUser);

  const user = await newUser.save();
  res.status(200).send({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    createdAt: user.createdAt,
    profile: {
      firstName: user.profile.firstName,
      lastName: user.profile.lastName,
      avatar: user.profile.avatar,
    },
  });
});
