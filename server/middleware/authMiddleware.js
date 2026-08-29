const jwt = require("jsonwebtoken");
const User = require("../models/UserSchema");

const protect = async (req, res, next) => {
  try {
    // نجيب الـ token من الـ Cookie
    const token = req.cookies.token;

    // لو مفيش Token
    if (!token) {
      return res.status(401).json({
        message: "Not authorized, no token",
      });
    }

    // فك تشفير الـ Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }


    // نحفظ بيانات المستخدم داخل req.user
   req.user = user;

    // نسمح للطلب يكمل
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

module.exports = protect;
