const jwt= require("jsonwebtoken")

module.exports=(req,res,next)=>{
   const token= req.get('authorization')
   if(!token || !token.toLowerCase().startsWith("bearer ")){
     return res.status(401).json({error: "No token provided or invalid"})
    }
    
    try {
        const {id,username}= jwt.verify(token.substring(7), process.env.SECRET_KEY)
        req.userId=id
        req.username=username
        next()
    } catch (error) {
       return res.status(401).json({error: "No token provided or invalid"})
    
   }
}