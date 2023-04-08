const {User , Character} = require('../db/index');



const getAllFavs=async(userId)=>{
    const user = await User.findByPk(userId,{ include:  [{ model: Character, through: {attributes:[]} }] });
    if(!user)throw new Error('User not found');
    return user.Characters;
}


const deleteFav=async(charId,userId)=>{
const user= await User.findByPk(userId)
const char = await Character.findByPk(charId)
await user.removeCharacter(char)
return char;
}


module.exports = {getAllFavs,deleteFav};