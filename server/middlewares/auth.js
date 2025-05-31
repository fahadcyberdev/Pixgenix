import jwt from 'jsonwebtoken';

const userAuth = async (req, res, next) => {
  const { token } = req.headers;
  
  if (!token) {
    return res.status(401).json({ success: false, message: 'Not Authorised. Please login again.' });
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

    if (tokenDecode.id) {
      req.user = { id: tokenDecode.id }; // Attach user id to req.user
      next();
    } else {
      return res.status(401).json({ success: false, message: 'Not Authorised. Please login again.' });
    }
  } catch (error) {
    return res.status(401).json({ success: false, message: error.message });
  }
};

export default userAuth;
