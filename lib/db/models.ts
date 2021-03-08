import {
  DataTypes,
  HasOneGetAssociationMixin,
  IntegerDataType,
  Model,
  Optional,
} from "sequelize";
import { sequelize } from "./connect";
import { randomBytes } from "crypto";

export interface ArticleAttributes {
  idArticles: number;
  body: string;
  publish: boolean;
  subtitle: string | null;
  title: string;
  url: string;

  createdAt?: Date | string;
  updatedAt?: Date | string;
  authorIdUsers?: string;
}

interface ArticleCreationAttributes
  extends Optional<
    ArticleAttributes,
    "idArticles" | "publish" | "subtitle" | "url"
  > {}

export const createURL = (title: string) => {
  return (
    title
      .replace(/ /g, "-")
      .replace(/[^a-zA-Z0-9-]/g, "")
      .slice(0, 50) +
    "-" +
    randomBytes(5).toString("hex")
  );
};
export class Article extends Model<
  ArticleAttributes,
  ArticleCreationAttributes
> {
  public idArticles!: IntegerDataType;
  public body!: string;
  public publish: boolean = false;
  public subtitle!: string | null;
  public title!: string;
  public url!: string | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public author!: HasOneGetAssociationMixin<User>;
}
Article.init(
  {
    idArticles: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    publish: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    subtitle: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      unique: true,
    },
  },
  { sequelize, modelName: "article" }
);

interface ArticleReactionAttributes {
  reaction: string;
}

export class ArticleReaction extends Model<ArticleReactionAttributes> {
  public reaction!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}
ArticleReaction.init(
  {
    reaction: {
      type: DataTypes.STRING,
    },
  },
  { sequelize, modelName: "articleReaction" }
);

export interface UserAttributes {
  idUsers: string;
  author: boolean;
  bio: string | null;
  displayName: string | null;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  title: string;

  createdAt?: Date | string;
  updatedAt?: Date | string;
}

interface UserCreationAttributes
  extends Optional<
    UserAttributes,
    "author" | "bio" | "displayName" | "email" | "firstName" | "lastName"
  > {}

export class User extends Model<UserAttributes, UserCreationAttributes> {
  public idUsers!: string;
  public author!: boolean;
  public bio!: string | null;
  public displayName!: string | null;
  public email!: string | null;
  public firstName!: string | null;
  public lastName!: string | null;
  public title!: string;

  public readonly createdAt: Date;
  public readonly updatedAt: Date;
}
User.init(
  {
    idUsers: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    author: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    bio: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    displayName: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    firstName: {
      type: DataTypes.STRING(45),
      allowNull: true,
      validate: {
        isAlpha: true,
      },
    },
    lastName: {
      type: DataTypes.STRING(45),
      allowNull: true,
      validate: {
        isAlpha: true,
      },
    },
    title: {
      type: DataTypes.STRING,
    },
  },
  { sequelize, modelName: "user" }
);

export const Author = Article.belongsTo(User, { as: "author" });
export const Articles = User.hasMany(Article);

// User.sync();
// Article.sync();
