import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/database";
import User from "./user";

class Note extends Model {
  public id!: string;
  public title!: string;
  public description!: string;
  public user_id!: string;
}

Note.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    underscored: true,
    tableName: "notes",
    timestamps: true,
  }
);

export default Note;

User.hasMany(Note, { foreignKey: "userId", as: "user_into" });
Note.belongsTo(User, { foreignKey: "userId", as: "user_into" });
