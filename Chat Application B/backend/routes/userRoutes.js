const router = require("express").Router();

const {
  register,
  login,
  setAvatar,
  getAllUsers,
  addFriends,
  friendsList,
} = require("../controllers/usersController");

router.post("/register", register);
router.post("/login", login);
router.post("/setAvatar/:id", setAvatar);
router.get("/allusers/:id", getAllUsers);
router.post("/addfriend/:id", addFriends);
router.get("/getFriends/:id", friendsList);

module.exports = router;
