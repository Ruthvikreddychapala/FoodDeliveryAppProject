module.exports = (req, res, next) => {

  try {

    // CHECK USER
    if (!req.user) {

      return res.status(401).json({
        message: "Unauthorized"
      });
    }

    // CUSTOMERS DON'T NEED APPROVAL
    if (req.user.role === "customer") {

      return next();
    }

    // RESTAURANT + DRIVER NEED APPROVAL
    if (!req.user.isApproved) {

      return res.status(403).json({
        message: "Account not approved yet"
      });
    }

    // ALLOW
    next();

  } catch (error) {

    res.status(500).json({
      error: error.message
    });
  }
};