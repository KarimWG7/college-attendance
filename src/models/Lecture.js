const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Course = require("./Course");

const Lecture = sequelize.define(
  "Lecture",
  {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    CourseID: {
      type: DataTypes.INTEGER,
      references: {
        model: Course,
        key: "ID",
      },
    },
    StartTime: {
      type: DataTypes.DATE, // Or TIME depending on DB, usually DATE in Sequelize handles both
      allowNull: true,
    },
    EndTime: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    Room: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    Date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    Code: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    State: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
  },
  {
    tableName: "Lectures",
    timestamps: false,
    validate: {
      stateCheck() {
        if (!this.State) return;
        const validStates = ["Active", "Closed"];
        if (!validStates.includes(this.State)) {
          throw new Error("Invalid state");
        }
      },
    },
  }
);

Lecture.belongsTo(Course, { foreignKey: "CourseID" });
Course.hasMany(Lecture, { foreignKey: "CourseID" });

module.exports = Lecture;
