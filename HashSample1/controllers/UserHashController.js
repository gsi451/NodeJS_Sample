const db = require("../models");
const crypto = require("crypto");

const UserHash = db.userhashs;

// 유저 추가
const addUserHash = async (req, res) => {
  const inputPassword = req.body.password;
  const salt = crypto.randomBytes(128).toString("base64");
  const hashPassword = crypto
    .createHash("sha512")
    .update(inputPassword + salt)
    .digest("hex");

  let info = {
    username: req.body.username,
    salt: salt,
    password: hashPassword,
  };

  const user = await UserHash.create(info).catch((err) => console.log(err));
  res.status(200).send(user);
};

// 모든 유저 목록을 가져온다.
const getAllUserHashs = async (req, res) => {
  let users = await UserHash.findAll({}).catch((err) => console.log(err));
  res.status(200).send(users);
};

// 해당 유저 목록을 가져온다.
const getUserHash = async (req, res) => {
  let id = req.params.id;
  let user = await UserHash.findOne({ where: { id: id } }).catch((err) =>
    console.log(err)
  );
  res.status(200).send(user);
};

// 해당 유저 정보를 변경한다.
const updateUserHash = async (req, res) => {
  let id = req.params.id;
  const user = await UserHash.update(req.body, { where: { id: id } }).catch(
    (err) => console.log(err)
  );
  res.status(200).send(user);
};

// 해당 유저 정보를 삭제한다.
const deleteUserHash = async (req, res) => {
  let id = req.params.id;
  await UserHash.destroy({ where: { id: id } }).catch((err) =>
    console.log(err)
  );
  res.status(200).send("User is deleted");
};

// 로그인
const getLogin = async (req, res) => {
  let username = req.body.username;

  // 저장된 회원 데이터를 가져온다.
  let user = await UserHash.findOne({ where: { username: username } }).catch(
    (err) => console.log(err)
  );

  // 입력받은 패스워드
  const inputPassword = req.body.password;
  // 입력받은 패스워드로 생성한 hash암호
  // 이때 회원의 salt값을 포함해서 만들어 줘야 한다.
  const inputhashPassword = crypto
    .createHash("sha512")
    .update(inputPassword + user.salt)
    .digest("hex");

  // 2개가 동일하면 성공 다르면 오류
  if (user.password === inputhashPassword) {
    res.status(200).send(user);
  } else {
    res.status(200).send("비밀번호가 틀립니다.");
  }
};

module.exports = {
  addUserHash,
  getAllUserHashs,
  getUserHash,
  updateUserHash,
  deleteUserHash,
  getLogin,
};
