import { verifyJWT } from "../utils/jwt.js";

const auth = async (req, res, next) => {
    // Post man bata token aauda yasto gareko. Tya bata chai cookie maa aauthyo token
    //real world ma cookie ra localStorage duitai bata token aauna sakxa 

    /*
    const cookie = req.headers.cookie;
    if (!cookie) return res.status(401).send("User is not authenticated!")
    const token = cookie.split("=")[1]
    if (!token) return res.status(401).send("User is not authenticated!")
    */
    try {

        //1. Authorization header nikalne
        const authHeader = req.headers.authorization || req.headers.Authorization;

        //2. Header navaye wa "Bearer " bata starts navaye block garne
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Access denied. No token provided"
            })
        }

        //3. "Bearer " lai xodera main token maatra nikalne
        const token = authHeader.split(" ")[1];

        // 4. Token verify garne
        const data = await verifyJWT(token)

        //5. verified user data lai req.user ma attached garne
        req.user = data;

        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token!"
        })

    }

}

export default auth;