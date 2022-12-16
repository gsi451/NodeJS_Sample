const userController = require("../controllers/userController.js");

const router = require("express").Router();

// postman에서 HTTP 메서드 Post로 지정후 http://localhost:3000/api/addUser 라고 하면 새로운 유저를 추가한다.
router.post("/addUser", userController.addUser);

// postman에서 HTTP 메서드 Get로 지정후 http://localhost:3000/api/allUsers 라고 하면 모든 목록을 가져온다.
router.get("/allUsers", userController.getAllUsers);

// postman에서 HTTP 메서드 Get로 지정후 http://localhost:3000/api/1 라고 입력하면 id에 해당하는 유저의 정보를 가져온다.
router.get("/:id", userController.getUser);

// postman에서 HTTP 메서드 Put로 지정후 http://localhost:3000/api/1 라고 입력하면 id에 해당하는 값을 변경할 수 있다.
router.put("/:id", userController.updateUser);

// postman에서 HTTP 메서드 Delete로 지정후 http://localhost:3000/api/1 라고 입력하면 id에 값이 1로 들어오며 삭제한다.
router.delete("/:id", userController.deleteUser);

module.exports = router;
