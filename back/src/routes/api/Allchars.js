const {Router}= require('express');
const {Character}=require('../../db/index');
const allChars=Router()



allChars.get('/',async(req,res)=>{
    try {
        const result= await Character.findAll({order:[["id","ASC"]]});
        res.status(200).json(result);
    } catch (error) {

        res.status(404).json({error:error.message});
    }
})




module.exports=allChars;