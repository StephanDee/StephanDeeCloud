/*
 * @Author: Stephan Dünkel 
 * @Date: 2019-07-18 15:04:26 
 * @Last Modified by:   Stephan Dünkel 
 * @Last Modified time: 2019-07-18 15:04:26 
 * 
 * Module providing the HTTP Status codes
 */
"use strict";

module.exports = {
  success: 200,
  created: 201,
  nocontent: 204,
  wrongrequest: 400,
  notfound: 404,
  wrongmethod: 405,
  conflict: 409,
  wrongdatatyperequest: 406,
  wrongmediasend: 415,
  servererror: 500
};
