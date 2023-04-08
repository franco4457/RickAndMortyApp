const{Character} = require('../db');

const getCharDetail = async( id) => {
const char = await Character.findByPk(id);
if(!char) throw new Error('Character not found');
return char;
};

module.exports = getCharDetail;
