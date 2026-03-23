function roleMiddleware(Role) {
  return (req, res, next) => {
    next(); 
  };
}

module.exports = roleMiddleware;