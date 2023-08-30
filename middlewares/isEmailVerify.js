const isEmailVerify = (req, res, next) => {
  const user = req.user;
  if (user.verification) {
    next();
  } else {
    res.stauts(401).json({
      status: "error",
      msg: "Email isn't verify",
    });
  }
};

// export default isEmailVerify;
