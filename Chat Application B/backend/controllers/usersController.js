const User = require("../models/userModel");
const brcypt = require("bcrypt");

module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck)
      return res.json({ msg: "Username already used", status: false });
    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res.json({ msg: "Email already used", status: false });
    const hashedPassword = await brcypt.hash(password, 10);
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });
    delete user.password;
    return res.json({ status: true, user });
  } catch (error) {
    next(error);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.json({ msg: "User not found !", status: false });
    const isPasswordValid = await brcypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.json({ msg: "Incorrect password !", status: false });
    delete user.password;
    return res.json({ status: true, user });
  } catch (error) {
    next(error);
  }
};

module.exports.setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await User.findByIdAndUpdate(userId, {
      isAvatarImageSet: true,
      avatarImage,
    });
    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "username",
      "avatarImage",
      "_id",
    ]);
    return res.json(users);
  } catch (error) {
    next(error);
  }
};

module.exports.addFriends = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const friendId = req.body._id;
    const userData = await User.findById(userId);
    const friendData = await User.findById(friendId);
    if (!userData.friends.includes(friendId)) {
      await userData.updateOne({ $push: { friends: friendId } });
      await friendData.updateOne({ $push: { friends: userId } });
      return res.json({ msg: "Added to your friends list !", status: true });
    } else {
      return res.json({ msg: "Already in your friends list !", status: false });
    }
  } catch (error) {
    next(error);
  }
};

// module.exports.friendsList = async (req, res, next) => {
//   try {
//     const userId = req.params.id;
//     const data = await User.findById(userId).select(["friends"]);
//     data.friends.map(async (item) => {
//       const details = await User.find({ _id: { $ne: item } }).select(["email"]);
//       return res.json(details);
//     });
//   } catch (error) {
//     next(error);
//   }
// };

module.exports.friendsList = async (req, res, next) => {
  try {
    let userId = req.params.id;
    const user = await User.findById(userId).select([
      "username",
      "avatarImage",
      "_id",
    ]);
    return res.json(user);
  } catch (error) {
    next(error);
  }
};
