/*
 * @Author: Stephan Dünkel 
 * @Date: 2019-07-18 15:02:33 
 * @Last Modified by: Stephan Dünkel
 * @Last Modified time: 2019-07-18 15:03:00
 * 
 * The token verifiyer.
 */
const jwt = require("jsonwebtoken");
const codes = require("../restapi/http-codes");

module.exports = function(req, res, next) {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(codes.notfound).json("Keine Berechtigung");
  } else {
    try {
      const verified = jwt.verify(token, process.env.TOKEN_SECRET);
      if (verified) {
        req.user = verified;
        next();
      }
    } catch (error) {
      res.status(codes.wrongrequest).json("Ungültiger Token");
    }
  }
};
