require('dotenv').config();
const { Sequelize } = require('sequelize');
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;
const character=require('./models/Character.js');
const user=require('./models/UserModel.js');


const URL =process.env.DB_URL|| `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/rym`
const sequelize = new Sequelize(
    URL,
    { logging: false, native: false }
 );
character(sequelize)
user(sequelize)

const{Character,User}=sequelize.models;

Character.belongsToMany(User,{through:'Favorites'});
User.belongsToMany(Character,{through:'Favorites'});


 module.exports = {
    ...sequelize.models,
    sequelize,
 };