module.exports = (sequelize, DataTypes) => {
    // UserHashs 이 값을 UserHash 로 해서 실행하면 UserHashes라고 테이블에 생긴다.
    // 왜 그런지는 모르겠지만 그냥 s를 붙이니까 다르게 변경되지 않는다.
  const UserHash = sequelize.define(
    "UserHashs",
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      username: DataTypes.STRING(35),
      salt: DataTypes.STRING(255),
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
  return UserHash;
};
