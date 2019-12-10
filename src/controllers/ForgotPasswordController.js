const User = require("../models/User");

class ForgotPasswordController {
  async index(req, res) {
    return res.render("dashboard/forgot-password");
  }
}

module.exports = new ForgotPasswordController();
