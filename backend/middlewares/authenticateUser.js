import jwt from 'jsonwebtoken';

export const authenticateUser = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    console.log("Authorization Header:", req.headers.authorization);
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        console.log(req.user);

        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            
            console.error("JWT Verification Error: Token has expired");
            return res.status(401).json({ message: 'Token has expired' });
        }
        console.error("JWT Verification Error:", error.message);
        res.status(401).json({ message: 'Invalid token' });
    }
};
export const checkAdmin = async (req, res, next) => {
  try {
    const token = req.cookies.ACCESS_TOKEN; // Assuming the token is stored in cookies
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: "Forbidden: Admins only" });
    }
    console.log("User is admin:", user);
    req.user = user; // Attach user to request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Error checking admin:", error.message);
    next(createError(403, 'Forbidden')); // Pass error to error-handling middleware
  }
}