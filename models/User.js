import { Sequelize, DataTypes } from "sequelize";
import {sequelize} from "./index.js";
import { lengthValidation } from "./validations.js";

const User = sequelize.define("User", {
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            lengthValidation
        }
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            lengthValidation
        }
    },
    password: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: {
                args: true,
                msg: "It should be a valid email address"
            }
        }
    },
    verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    account_created: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    account_updated: {
        type: DataTypes.DATE
    }
}, {
    createdAt: false,
    updatedAt: false
});

export default User;