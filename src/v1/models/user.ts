import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../config/database";
import { UserAttributes } from "../types/user";

interface UserCreationAttributes
  extends Optional<
    UserAttributes,
    | "id"
    | "name"
    | "photo_url"
    | "is_active"
    | "created_by"
    | "updated_by"
    | "deleted_by"
    | "created_on"
    | "updated_on"
    | "deleted_on"
  > {}

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: string;
  public name!: string;
  public username!: string;
  public photo_url!: string;
  public is_active!: boolean;

  public created_by?: string;
  public updated_by?: string;
  public deleted_by?: string;

  public created_on!: Date;
  public updated_on!: Date;
  public deleted_on?: Date | null;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    photo_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },

    created_by: {
      type: DataTypes.UUID,
      allowNull: true,
    },

    updated_by: {
      type: DataTypes.UUID,
      allowNull: true,
    },

    deleted_by: {
      type: DataTypes.UUID,
      allowNull: true,
    },

    created_on: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },

    updated_on: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },

    deleted_on: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "users",
    underscored: true,
    timestamps: false,
  }
);

export default User;
