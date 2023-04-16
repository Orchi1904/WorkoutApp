import jwt from "jsonwebtoken"

const authToken = async (req, res, next) => {
    const token = req.header("x-auth-token");

    if(!token){
        return res.status(401).json({msg: "Nutzer ist nicht angemeldet!"});
    } 

    try{
        const user = jwt.verify(token, "verysecretkey");
        req.userId = user.id;
        next();
    }catch (error) {
        res.status(403).json({msg: "Der Token ist nicht gültig!"});
    }

}

export default authToken;