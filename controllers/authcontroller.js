const jwt=require("jsonwebtoken");
exports.login=(req,res)=>{
    const{username,password}=req.body;
    if(username !== "admin" || password !=="admin123"){
        return res.status(401).json({
            message: "Invalid username or password"
        });

    }
    const token=jwt.sign(
        {username:username},
        process.env.JWT_SECRET,
        {expiresIn:"1h"}
    );
    res.json({
        message:"login successfull",
        token:token
    });
};