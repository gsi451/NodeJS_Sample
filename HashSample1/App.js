const express = require("express");
const cors = require("cors");
const app = express();

var corOptions = {
  origin: "https://localhost:3000",
};

app.set("port", process.env.PORT || 3000);

app.use(cors(corOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//require("./models/index");
// 생성한 라우터로 교체
const router = require("./routers/UserRouter.js");
app.use("/api", router);

app.get("/", (req, res) => {
  res.json({ message: "비밀번호 Hash 저장 샘플코드" });
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중");
});
